<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

use App\Models\Entity\Projeto as Pro;
use App\Models\Entity\Usuario as User;
use App\Models\Entity\Equipe;

class ScrumMaster{
     
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
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $entityManager = $this->container->get('em');
        $tarefa = $entityManager->createQuery('select p.id as idProjeto, p.nome, IDENTITY(e.time) as timeProjeto
                                                from App\Models\Entity\Equipe e
                                                join App\Models\Entity\Projeto p
                                                with p.id = e.projeto
                                                where e.scrumMaster = :idUsuario');
        $tarefa->setParameters(array(
        'idUsuario' => $idUsuario
        ));
        $return = $response->withJson($tarefa->getResult(), 200) 
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