<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

use App\Models\Entity\Sprint as Spr;
use App\Models\Entity\SprintBacklog as SprBacklog;

class Sprint{
     
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
        $IDUsuario = $this->getIDToken($request->getHeader('X-token'));       
        $entityManager = $this->container->get('em');
        $sprint = (new Spr());
        $entityManager->persist($sprint);
        $entityManager->flush();
        foreach($dados['itensSelecionados'] as $IDItemBacklog){
            $itemBacklog = $entityManager->getRepository('App\Models\Entity\Tarefa')
                                    ->find($IDItemBacklog);
            $sprintBacklog = (new SprBacklog())->setItemBacklog($itemBacklog)
                                        ->setSprint($sprint);
            $entityManager->persist($sprintBacklog);
            $entityManager->flush();
        }

        $return = $response->withJson($sprint, 201)
        ->withHeader('Content-type', 'application/json');
        return $return;   
    }

    public function listar($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $IDUsuario = $this->getIDToken($request->getHeader('X-token'));       
        $entityManager = $this->container->get('em');
        $IDProjeto = (int) $args['id_projeto'];
        $query = $this->querySprint("buscar", $entityManager, $IDProjeto, $IDUsuario);
            
        $return = $response->withJson($query->getResult(), 200) 
                               ->withHeader('Content-type', 'application/json');
        return $return;
    }

    public function contarSprint($request, $response, $args){
        $IDUsuario = $this->getIDToken($request->getHeader('X-token'));       
        $entityManager = $this->container->get('em');
        $IDProjeto = (int) $args['id_projeto'];
        $query = $this->querySprint("contar",$entityManager, $IDProjeto, $IDUsuario);

        $return = $response->withJson($query->getSingleScalarResult(), 200) 
                           ->withHeader('Content-type', 'application/json');
        return $return;
    }

    public function getTarefa($request, $response, $args){
        $IDUsuario = $this->getIDToken($request->getHeader('X-token'));       
        $entityManager = $this->container->get('em');
        $IDSprintBacklog = (int) $args['id_sprint_backlog'];

        $query = $entityManager->createQuery('select st.nome as nomeTarefa
                                                    , IDENTITY(st.desenvolvedor) as desenvolvedor
                                                    , st.dataCriacao  as dataCriacaoTarefa
                                                    , st.id as IDTarefa
                                                    , st.descricao 
                                                    from App\Models\Entity\SprintTarefa st
                                                    join App\Models\Entity\SprintBacklog sb
                                                    with st.sprintBacklog = sb.id
                                                    join App\Models\Entity\Tarefa t
                                                    with t.id = sb.item_backlog
                                                    join App\Models\Entity\Projeto p
                                                    with p.id = t.projeto
                                                    join App\Models\Entity\Equipe e
                                                    with e.projeto = p.id 
                                                    where e.scrumMaster = :IDUsuario  and sb.id = :IDSprintBacklog');
        
        $query->setParameters(array(
           'IDSprintBacklog' => $IDSprintBacklog,
           'IDUsuario' => $IDUsuario
        ));
                                            
        $return = $response->withJson($query->getResult(), 200) 
                          ->withHeader('Content-type', 'application/json');
        return $return;

    }

    function querySprint($tipoQuery,$entityManager, $IDProjeto, $IDUsuario){
        $sql ="";
        if($tipoQuery == "contar"){
            $sql .="select count(s.id) as IDSprint";
        }
        if($tipoQuery == "buscar"){
            $sql ='select s.id as IDSprint
            , s.dataCriacao      
            , s.dataEntrega
            , s.pronto
            , IDENTITY(t.projeto) as IDProjeto';
        }
        $sql .=' from App\Models\Entity\SprintBacklog sb
        join App\Models\Entity\Tarefa t
        with t.id = sb.item_backlog
        join App\Models\Entity\Sprint s
        with s.id = sb.sprint
        join App\Models\Entity\Equipe e
        with e.projeto = t.projeto
        where 1=1 and e.scrumMaster = :IDUsuario and t.projeto = :IDProjeto and t.prioridade >0';
        
        if($tipoQuery == "buscar"){
            $sql .=' group by s.id, s.dataCriacao, s.dataEntrega, s.pronto, t.prioridade, t.projeto';
        }
        //echo $sql;          
        $query = $entityManager->createQuery($sql);
        $query->setParameters(array(
            'IDProjeto' => $IDProjeto,
            'IDUsuario' => $IDUsuario
        ));

        return $query;
    }

    function getIDToken($token){
        $key = $this->container->get("secretkey");
        $decoded = JWT::decode($token[0], $key, array('HS256'));
        $decoded_array = (array) $decoded;
        return $decoded_array['id'];
    }
}