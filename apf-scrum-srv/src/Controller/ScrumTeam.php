<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface      as Response;
use Firebase\JWT\JWT;

use App\Models\Entity\Projeto as Pro;
use App\Models\Entity\Usuario as User;
use App\Models\Entity\Equipe  as Equipe;
use App\Models\Entity\Time    as Time;
use App\Models\Entity\TarefaScrumMaster    as TM;

use App\Controller\TipoContagem;

class ScrumTeam{
     
    /**
     * Container Class
     * @var [object]
     */
     private $container;
     /**
      * Undocumented function
      * @param [object] $container
      */

    public function __construct($container) {
        $this->container = $container;
    }

    public function getTarefa($request, $response, $args){
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $entityManager = $this->container->get('em');
        //var_dump($idUsuario);
        $tarefa = $entityManager->createQuery('select st.id as IDTarefa
                                                , st.nome as nomeItemSprintBacklog
                                                , p.nome as nomeProjeto
                                                , IDENTITY(sb.sprint) as NSprint
                                                , tm.status as statusTarefa  
                                                , tm.statusConclusao as statusConclusao
                                                from  App\Models\Entity\Projeto p
                                                join App\Models\Entity\Equipe e
                                                with p.id = e.projeto
                                                join App\Models\Entity\Time t
                                                with e.time = t.id
                                                join App\Models\Entity\MembroTime mt
                                                with mt.time = t.id
                                                join App\Models\Entity\Tarefa ta
                                                with ta.projeto = p.id
                                                join App\Models\Entity\SprintBacklog sb
                                                with sb.item_backlog = ta.id
                                                join  App\Models\Entity\SprintTarefa st
                                                with sb.id = st.sprintBacklog
                                                left join App\Models\Entity\TarefaScrumMaster tm
                                                with tm.tarefa=st.id
                                                where  mt.desenvolvedor = :idUsuario');
        $tarefa->setParameters(array(
                    'idUsuario' => $idUsuario
        ));
        if(!$tarefa->getResult()){
            throw new \Exception("Tarefas não encontradas", 404);
        }

        //$contagemDB = json_decode(json_encode($contagem), true);

        $return = $response->withJson($tarefa->getResult(), 200) 
                           ->withHeader('Content-type', 'application/json');
        return $return;   
    
    }
    public function assumirTarefa($request, $response, $args){
        $idUsuario = $this->getIDToken($request->getHeader('X-token'));
        $IDTarefa = (int) $args['id_tarefa']; 
        $entityManager = $this->container->get('em');
        $tarefa = $entityManager->getRepository('App\Models\Entity\SprintTarefa')
                               ->find($IDTarefa);
        $usuario = $entityManager->getRepository('App\Models\Entity\Usuario')
                               ->find($idUsuario);
        //var_dump($idUsuario);
        if(!$tarefa){
            throw new \Exception("tarefa nao existe", 404);
        }
        $tarefaScrumMaster = $entityManager->getRepository(TM::class)
                                           ->findOneBy(array('tarefa' => $IDTarefa));
        
        if($tarefaScrumMaster && $args['acao'] == 'concluir'){
            if($this->donoTarefa($idUsuario, $tarefaScrumMaster)){
                $return = $response->withJson($this->concluir($response, $entityManager, $tarefaScrumMaster,  $tarefa), 200) 
                                ->withHeader('Content-type', 'application/json');
                return $return;
            }
            $return = $response->withJson(['msg' => 'Tarefa pertence ao outro membro do time'], 401) 
                                ->withHeader('Content-type', 'application/json');
            return $return;
        }
        if(!$tarefaScrumMaster && $args['acao'] == 'assumir'){
            $tarefaSM = (new TM())->setTarefa($tarefa)
                                    ->setDesenvolvedorAtual($usuario)
                                    ->setStatus(1);
            $entityManager->persist($tarefaSM);
            $entityManager->flush();
            $return = $response->withJson($tarefaSM, 200) 
                ->withHeader('Content-type', 'application/json');
            return $return;
        } 
        if($tarefaScrumMaster && $args['acao'] == 'desistir'){
            if($this->donoTarefa($idUsuario, $tarefaScrumMaster)){
                $return = $response->withJson($this->desistir($response, $entityManager, $tarefaScrumMaster, $tarefa), 200) 
                                ->withHeader('Content-type', 'application/json');
            return $return;
            }
            $return = $response->withJson(['msg' => 'Tarefa pertence ao outro membro do time'], 401) 
                                ->withHeader('Content-type', 'application/json');
            return $return;
        }                                         
        if($tarefaScrumMaster && $args['acao'] == 'assumir'){
            
            $tarefaScrumMaster->setTarefa($tarefa)
                             ->setDesenvolvedorAtual($usuario)
                             ->setStatus(1);
            $entityManager->persist($tarefaScrumMaster);
            $entityManager->flush();

            $return = $response->withJson($tarefaScrumMaster, 200) 
                                ->withHeader('Content-type', 'application/json');
            return $return;
        }                                         
      
        $return = $response->withJson($tarefaSM, 200) 
                            ->withHeader('Content-type', 'application/json');
        return $return;

    }

    function concluir($response, $entityManager, $tarefaScrumMaster, $tarefa ){
        $tarefaScrumMaster->setTarefa($tarefa)
                          ->setStatusConclusao(1);
        $entityManager->persist($tarefaScrumMaster);
        $entityManager->flush();
        return $tarefaScrumMaster;
    }
    function donoTarefa($idUsuario, $tarefaScrumMaster){
        if($idUsuario == $tarefaScrumMaster->getDesenvolvedorAtual()->getId())
            return true;
        return false;
    }
    function desistir($response, $entityManager, $tarefaScrumMaster, $tarefa ){
        $tarefaScrumMaster->setTarefa($tarefa)
                         ->setStatus(0);
        $entityManager->persist($tarefaScrumMaster);
        $entityManager->flush();
        return $tarefaScrumMaster;
    }

    function contarPontosTarefa($tr, $td){
        $tipoContagem = ['ALI', 'AIE','EE', 'SE', 'CE'];
        TipoContagem()->complexidade('ALI',1,1);
    }

    function getIDToken($token){
        $key = $this->container->get("secretkey");
        $decoded = JWT::decode($token[0], $key, array('HS256'));
        $decoded_array = (array) $decoded;
        return $decoded_array['id'];
    }
}
