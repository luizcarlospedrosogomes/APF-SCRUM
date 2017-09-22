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
      /*  $time = $entityManager->createQuery('select t.nome, IDENTITY(m.desenvolvedor) as desenvolvedor
                                            from App\Models\Entity\Time t
                                            left join App\Models\Entity\MembroTime m
                                            with t.id = m.time
                                            where t.scrummaster = :idUsuario');
        $time->setParameters(array(
            'idUsuario' => $idUsuario
        ));
        */
        $time = $entityManager->getRepository(Team::class)->findBy(array("scrummaster"=>$idUsuario));
        if(!$time){
            throw new \Exception("nenhum time encontrado", 404);
        }
        $return = $response->withJson($time, 200)
                           ->withHeader('Content-type', 'application/json');
        return $return;     
    }

    public function visualizar($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $id = (int) $args['id'];      
        $entityManager = $this->container->get('em');
        /*$time = $entityManager->createQuery('select t.nome, IDENTITY(m.desenvolvedor) as IDDesenvolvedor, u.email
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
        */
        $time = $entityManager->getRepository(Team::class)->find($id);
        if(!$time){
            throw new \Exception("nenhum time encontrado", 404);
        }
        $return = $response->withJson($time, 200)
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
            $return = $response->withJson("", 404)
                                ->withHeader('Content-type', 'application/json');            
            return $return;
        }
        $time =  $entityManager->getRepository('App\Models\Entity\Time')
                                ->find($dados['id_time']);
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

    public function listarMembro($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $idTime = (int) $args['id_time'];      
        $entityManager = $this->container->get('em');
        $membroTime = $entityManager->createQuery('select m.id as idMembro, IDENTITY(m.desenvolvedor) as IDDesenvolvedor, u.email
                                            from App\Models\Entity\MembroTime m
                                            left join App\Models\Entity\Usuario u
                                            with m.desenvolvedor = u.id
                                            where m.time = :idTime
                                          ');
        $membroTime->setParameters(array(
            'idTime' => $idTime
        ));
        
        if(!$membroTime->getResult()){
            throw new \Exception("não existem desenvolvedores no time", 404);
        }
        $return = $response->withJson($membroTime->getResult(), 200)
                           ->withHeader('Content-type', 'application/json');
        return $return;     
    }

    public function excluirMembro($request, $response, $args){
        $idMembro = (int) $args['id_membro']; 
        $idUsuario = $this->getIDToken($request->getHeader('X-token'));
        $entityManager = $this->container->get('em');
        $membro =  $entityManager->getRepository('App\Models\Entity\MembroTime')
                                        ->find($idMembro);
        if(!$membro){
            throw new \Exception("nenhum desenvolvedor encontrado", 404);
        }
        
        $entityManager->remove($membro);
        $entityManager->flush();
        $return = $response->withJson(200)
                           ->withHeader('Content-type', 'application/json');
        return $return;     
    }
    
    public function removerTimeProjeto($request, $response, $args){
        $idTime = (int) $args['id_time']; 
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-token'));
        $entityManager = $this->container->get('em');
        $equipe =  $entityManager->getRepository('App\Models\Entity\Equipe')
                                        ->findOneBy(array('time'=> $idTime, 'projeto' => $dados['id_projeto']));
        
        if(!$equipe){
            throw new \Exception("Não existem times para este projeto", 404);
        }
        $equipe->setTime(NULL);
        $entityManager->persist($equipe);
        $entityManager->flush();
        $return = $response->withJson(200)
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