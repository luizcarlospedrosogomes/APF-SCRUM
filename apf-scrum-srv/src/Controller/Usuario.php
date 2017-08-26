<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use App\Models\Entity\Usuario as User;


class Usuario{

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

     /**
     * Cria um usuario
     * @param [type] $request
     * @param [type] $response
     * @param [type] $args
     * @return Response
     */
    public function cadastrar($request, $response, $args){ 
        $dados = json_decode($request->getBody(),true);        
        $entityManager = $this->container->get('em');
        $usuario = (new User())->setEmail($dados['email'])
                               ->setTipoUsuario($dados['tipo'])
                               ->setSenha($dados['senha']);        
                 
        $entityManager->persist($usuario);
        $entityManager->flush();
        $return = $response->withJson($usuario, 201)
        ->withHeader('Content-type', 'application/json');
        return $return;  
    }

    public function checar($request, $response, $args){ 

    }
}