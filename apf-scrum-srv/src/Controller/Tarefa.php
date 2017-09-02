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
        $email = $this->getEmailToken($request->getHeader('X-token'));    
        $entityManager = $this->container->get('em');
        $projeto = $entityManager->getRepository('App\Models\Entity\Projeto')
                                 ->findOneBy(array('id' => $dados['id_projeto']));
        $usuario = $entityManager->getRepository('App\Models\Entity\Usuario')
                           ->findOneBy(array('email' => $email));
        //var_dump($projeto);
        if($projeto == NULL || $usuario == NULL){
            // return $this->notFound('Houve um problema ao innserir os dados', $response);
            $return = $response->withJson(['mensagem'=>$msg], 400)
            ->withHeader('Content-type', 'application/json');            
            return $return;
        
        }
      $tarefa = (new Tar())->setNome($dados['nome'])
                              ->setProjeto($projeto)
                              ->setDescricao($dados['descricao'])
                              ->setPrioridade($dados['prioridade']);
                              //->setUsuario($usuario); 
      // var_dump($tarefa);
                               $entityManager->persist($tarefa);
        $entityManager->flush();
        $return = $response->withJson($tarefa, 201)
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
        $id = $this->getIDToken($request->getHeader('X-token')); 
        $entityManager = $this->container->get('em');
        $projeto = $entityManager->getRepository(Pro::class)->findBy(array("usuario"=>$idUsuario,"id"=>$id));
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