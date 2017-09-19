<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

use App\Models\Entity\SprintTarefa as Tarefa;

class SprintTarefa{
     
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
        $dados           = json_decode($request->getBody(),true); 
        $IDUsuario       = $this->getIDToken($request->getHeader('X-token'));       
        $entityManager   = $this->container->get('em');
        $IDSprintBacklog = (int) $args['id_sprint_backlog'];
        $usuario         = $entityManager->getRepository('App\Models\Entity\Usuario')
                                 ->findOneBy(array('id' => $IDUsuario));
        if(!$usuario){
            throw new \Exception("usuario não encontrado", 404);
        }
        $sprintBacklog         = $entityManager->getRepository('App\Models\Entity\SprintBacklog')
                                               ->find($IDSprintBacklog);
        $tarefa = (new Tarefa())->setNome($dados['nome'])
                                ->setDescricao($dados['descricao'])
                                ->setSprintBacklog($sprintBacklog); 
        $entityManager->persist($tarefa);
        $entityManager->flush();
        $return = $response->withJson($tarefa, 201)
                           ->withHeader('Content-type', 'application/json');
        return $return;   
    }

    function getIDToken($token){
        $key = $this->container->get("secretkey");
        $decoded = JWT::decode($token[0], $key, array('HS256'));
        $decoded_array = (array) $decoded;
        return $decoded_array['id'];
    }
}   