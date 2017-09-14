<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

use App\Models\Entity\SprintBacklog as SprBacklog;

class SprintBacklog{
     
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

    public function listar($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $IDUsuario = $this->getIDToken($request->getHeader('X-token'));       
        $entityManager = $this->container->get('em');
        $IDSprint = (int) $args['id_sprint'];
      
        $sprintBacklog= $this->getItensSprintBacklog($entityManager, $this->getTipoUsuario($entityManager,$IDUsuario), $IDUsuario, $IDSprint);
        $return = $response->withJson($sprintBacklog->getResult(), 200) 
                           ->withHeader('Content-type', 'application/json');
        return $return; 
    }

    function getItensSprintBacklog($entityManager, $tipoUsuario, $IDUsuario, $IDSprint){
        
        $sql ='select sb.id as IDSprintBacklog
                    , t.id as IDTarefa
                    , s.id as IDSprint
                    , t.nome as nomeItemBacklog
                    ,  p.nome as nomeProjeto        
        from App\Models\Entity\SprintBacklog sb
        join App\Models\Entity\Tarefa t
        with t.id = sb.item_backlog
        join App\Models\Entity\sprint s
        with s.id = sb.sprint
        join App\Models\Entity\projeto p
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
        $sql .= ' and s.id = :IDSprint and t.prioridade >0
                  ORDER BY t.prioridade';
        //echo $sql;          
        $query = $entityManager->createQuery($sql);
        $query->setParameters(array(
            'idUsuario' => $IDUsuario,
            'IDSprint' => $IDSprint,
        ));

        return $query; 
    }

    function getTipoUsuario($entityManager, $IDUsuario){
        $usuario = $entityManager->getRepository('App\Models\Entity\Usuario')
                                 ->find($IDUsuario);
        return $usuario->getTipoUsuario();
    }

    function getIDToken($token){
        $key = $this->container->get("secretkey");
        $decoded = JWT::decode($token[0], $key, array('HS256'));
        $decoded_array = (array) $decoded;
        return $decoded_array['id'];
    }
}