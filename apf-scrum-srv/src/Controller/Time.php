<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

use App\Models\Entity\Time as Team;
use App\Models\Entity\MembroTime as MTeam;

class Time{
     
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
                                 ->findOneBy(array('email' => $email, 'tipoUsuario'=>2));
        if(!$usuario){
           throw new \Exception("usuario não encontrado", 404);
        }
        $time = (new Team())->setNome($dados['nome'])
                              ->setScrumMaster($usuario); 
        $entityManager->persist($time);
        $entityManager->flush();
        $return = $response->withJson($time, 201)
        ->withHeader('Content-type', 'application/json');
        return $return;   
    }
    
    public function listar($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-token'));       
        $entityManager = $this->container->get('em');
        $time = $entityManager->createQuery('select t.nome, IDENTITY(m.desenvolvedor) as desenvolvedor
                                            from App\Models\Entity\Time t
                                            left join App\Models\Entity\MembroTime m
                                            with t.id = m.time
                                            where t.scrummaster = :idUsuario');
        $time->setParameters(array(
            'idUsuario' => $idUsuario
        ));
        if(!$time->getResult()){
            throw new \Exception("nenhum time encontrado", 404);
        }
        $return = $response->withJson($time->getResult(), 200)
                           ->withHeader('Content-type', 'application/json');
        return $return;     
    }

    public function visualizar($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $id = (int) $args['id'];      
        $entityManager = $this->container->get('em');
        $time = $entityManager->createQuery('select t.nome, IDENTITY(m.desenvolvedor) as IDDesenvolvedor, u.email
                                            from App\Models\Entity\Time t
                                            left join App\Models\Entity\MembroTime m
                                            with t.id = m.time
                                            join App\Models\Entity\Usuario u
                                            with m.desenvolvedor = u.id
                                            where t.scrummaster = :idUsuario and t.id = :idTime
                                          ');
        $time->setParameters(array(
            'idUsuario' => $idUsuario,
            'idTime' => $id
        ));
        if(!$time->getResult()){
            throw new \Exception("nenhum time encontrado", 404);
        }
        $return = $response->withJson($time->getResult(), 200)
                           ->withHeader('Content-type', 'application/json');
        return $return;     
    }

    public function adicionarMembro($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-token'));
        $entityManager = $this->container->get('em');
        $desenvolvedor =  $entityManager->getRepository('App\Models\Entity\Usuario')
                                        ->findOneBy(array('email' =>$dados['email'], 'tipoUsuario'=>3));
        if(!$desenvolvedor){
            throw new \Exception("nenhum desenvolvedor encontrado", 404);
        }
        $time =  $entityManager->getRepository('App\Models\Entity\Time')
                                ->findOneBy(array('scrummaster' =>$idUsuario));
        if(!$time){
            throw new \Exception("nenhum time encontrado", 404);
        } 
        $membroEquipe = (new MTeam())->setDesenvolvedor($desenvolvedor)
                                           ->setTime($time);
        $entityManager->persist($membroEquipe);
        $entityManager->flush();
        $return = $response->withJson($membroEquipe, 200)
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
}