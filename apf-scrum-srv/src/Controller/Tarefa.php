<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

use App\Models\Entity\Projeto as Pro;
use App\Models\Entity\Tarefa as Tar;

class Tarefa{
     
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

    public function criar($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-Token'));    
      // var_dump($dados['id_projeto']);
        $entityManager = $this->container->get('em');
        $projeto = $entityManager->getRepository('App\Models\Entity\Projeto')
                                 ->find($dados['id_projeto']);
        $usuario = $entityManager->getRepository('App\Models\Entity\Usuario')
                                 ->find($idUsuario);
        if(!$projeto || !$usuario){
            throw new \Exception("projeto ou usuario incorretos", 400);
        }
       $tarefa = (new Tar())->setNome($dados['nome'])
                              ->setProjeto($projeto)
                              ->setDescricao($dados['descricao'])
                              ->setPrioridade($dados['prioridade']);

       $entityManager->persist($tarefa);
       $entityManager->flush();
       $return = $response->withJson($tarefa, 201)
                        ->withHeader('Content-type', 'application/json');
        return $return;    
       
    }

    public function atualizar($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-Token'));
        $entityManager = $this->container->get('em');
        $id = (int) $args['id'];
        $tarefa = $entityManager->getRepository(Tar::class)->find($id);
        
        if(!$tarefa){
            throw new \Exception("tarefa not Found", 404);
        }
        $tarefa->setNome($dados['nome']);
        $tarefa->setPrioridade($dados['prioridade']);
        $tarefa->setDescricao($dados['descricao']);
        $entityManager->persist($tarefa);
        $entityManager->flush();
        $return = $response->withJson($tarefa, 201)
                           ->withHeader('Content-type', 'application/json');
        return $return; 
        
    }
    public function visualizar($request, $response, $args){
        $idUsuario = $this->getIDToken($request->getHeader('X-token'));
        $entityManager = $this->container->get('em');
        $id = (int) $args['id'];
    
        $tarefa = $entityManager->createQuery('select t. id, t.nome, t.descricao, t.dataCriacao, t.prioridade 
                                             from App\Models\Entity\Tarefa t
                                             join App\Models\Entity\Projeto p
                                             with p.id = t.projeto
                                             join App\Models\Entity\Usuario u
                                             with u.id = p.usuario
                                             where u.id = :idUsuario and  t.id = :id
                                             ORDER BY t.prioridade');
        $tarefa->setParameters(array(
               'idUsuario' => $idUsuario ,
               'id' => $id,
                ));
        if(!$tarefa){
                    throw new \Exception("tarefa not Found", 404);
        }

        $return = $response->withJson($tarefa->getResult(), 201)
                                             ->withHeader('Content-type', 'application/json');
        return $return;     
       
    }
    public function listar($request, $response, $args){
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $idProjeto = $args['id_projeto']; 
        $entityManager = $this->container->get('em');
        $tarefa = $this->getTarefa($entityManager, $this->getTipoUsuario($entityManager,$idUsuario), $idUsuario, $idProjeto);
        $return = $response->withJson($tarefa->getResult(), 200) 
                           ->withHeader('Content-type', 'application/json');
        return $return; 
    }

    public function arquivar($request, $response, $args){
        $entityManager = $this->container->get('em');
        $tarefa = $entityManager->getRepository(Tar::class)->find($args['id']);
        if(!$tarefa){
            throw new \Exception("tarefa not Found", 404);
        }
        $tarefa->setPrioridade(0);
        $entityManager->persist($tarefa);
        $entityManager->flush();
        $return = $response->withJson(array("msg" => "tarefa arquivada com sucesso"), 201)
                           ->withHeader('Content-type', 'application/json');
        return $return; 


    }
    function getTipoUsuario($entityManager, $idUsuario){
        $usuario = $entityManager->getRepository('App\Models\Entity\Usuario')
                                 ->find($idUsuario);
        return $usuario->getTipoUsuario();
    }

    function getTarefa($entityManager, $tipoUsuario, $idUsuario, $idProjeto){
        
        $sql ='select p.id as IDProjeto, t.id as IDTarefa, t.nome, t.descricao, t.dataCriacao, t.prioridade 
        from App\Models\Entity\Tarefa t
        join App\Models\Entity\Projeto p
        with p.id = t.projeto
        join App\Models\Entity\Usuario u
        with u.id = p.usuario
        join App\Models\Entity\Equipe e
        with e.projeto = p.id
        where 1=1';
        if($tipoUsuario == 2){
            $sql .= ' and e.scrumMaster = :idUsuario ';
        }
        if($tipoUsuario == 1){
           $sql .= ' and u.id = :idUsuario  ';
        }
        $sql .= ' and p.id = :idProjeto and t.prioridade >0
                  ORDER BY t.prioridade';
        //echo $sql;          
        $tarefa = $entityManager->createQuery($sql);
        $tarefa->setParameters(array(
            'idUsuario' => $idUsuario,
            'idProjeto' => $idProjeto,
        ));

        return $tarefa; 
    }

    function getIDToken($token){
        $key = $this->container->get("secretkey");
        $decoded = JWT::decode($token[0], $key, array('HS256'));
        $decoded_array = (array) $decoded;
        return $decoded_array['id'];
    }
}