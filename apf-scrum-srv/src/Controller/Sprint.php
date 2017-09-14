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

    function getIDToken($token){
        $key = $this->container->get("secretkey");
        $decoded = JWT::decode($token[0], $key, array('HS256'));
        $decoded_array = (array) $decoded;
        return $decoded_array['id'];
    }
}