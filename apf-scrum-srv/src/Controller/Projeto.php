<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

use App\Models\Entity\Projeto as Pro;
use App\Models\Entity\Usuario as User;
use App\Models\Entity\Equipe;

class Projeto{
     
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
        $email = $this->getEmailToken($request->getHeader('X-token'));       
        $entityManager = $this->container->get('em');
        $usuario = $entityManager->getRepository('App\Models\Entity\Usuario')
                                 ->findOneBy(array('email' => $email));
        if($usuario == NULL){
            $this->notFound('Houve um problema ao innserir os dados:[EMAIL: ]'.$usuario->email.' [ID :]'.$usuario->id, $response);
        }
        $projeto = (new Pro())->setNome($dados['nome'])
                              ->setUsuario($usuario); 
        $entityManager->persist($projeto);
        $equipe = (new Equipe())->setProjeto($projeto)
                                //->setProductOwner($projeto)
                                ; 
        $entityManager->persist($equipe);
        $entityManager->flush();
        $return = $response->withJson($projeto, 201)
        ->withHeader('Content-type', 'application/json');
        return $return;   
    }

    public function atualizar($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-token'));
        $entityManager = $this->container->get('em');
        $id = (int) $args['id'];
        //$projeto = $entityManager->getRepository(Pro::class)->findBy(array("usuario"=>$idUsuario,"id"=>$id));
        $projeto = $entityManager->getRepository(Pro::class)->findOneBy(array("usuario"=>$idUsuario,"id"=>$id));
        $nome =$dados['nome'];
        if($projeto == NULL){
            $this->notFound('projeto nao existe', $response);
        }
        $projeto->setNome($nome);
        $entityManager->persist($projeto);
        $entityManager->flush();
        $return = $response->withJson($projeto, 201)
        ->withHeader('Content-type', 'application/json');
        return $return; 
        
    }
    public function visualizar($request, $response, $args){
        $idUsuario = $this->getIDToken($request->getHeader('X-token'));
        $entityManager = $this->container->get('em');
        $id = (int) $args['id'];
        $projeto = $entityManager->getRepository(Pro::class)->findBy(array("usuario"=>$idUsuario,"id"=>$id));
        if($projeto == NULL){
            $this->notFound('projeto nao existe', $response);
        }
        $return = $response->withJson($projeto, 201)
        ->withHeader('Content-type', 'application/json');
        return $return;     
    }
    public function listar($request, $response, $args){
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $entityManager = $this->container->get('em');
        $projeto = $entityManager->getRepository(Pro::class)->findBy(array("usuario"=>$idUsuario));
        if($projeto == NULL){
            $this->notFound('Não existe projetos para este usuario', $response);
        }
        $return = $response->withJson($projeto, 201) 
                          ->withHeader('Content-type', 'application/json');
        return $return;   

    }

    function getEmailToken($token){
        $key = $this->container->get("secretkey");
        $decoded = JWT::decode($token[0], $key, array('HS256'));
        $decoded_array = (array) $decoded;
        return $decoded_array['email'];
    }

    function getIDToken($token){
        $key = $this->container->get("secretkey");
        $decoded = JWT::decode($token[0], $key, array('HS256'));
        $decoded_array = (array) $decoded;
        return $decoded_array['id'];
    }
    function notFound($msg, $response){
        
         $return = $response->withJson(['mensagem'=>$msg], 400)
                            ->withHeader('Content-type', 'application/json');            
        return $return;
        
    }
}