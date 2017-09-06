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
        if(!$projeto || $usuario){
            throw new \Exception("projeto ou usuario incorretos", 400);
        }
       $tarefa = (new Tar())->setNome($dados['nome'])
                              ->setProjeto($projeto)
                              ->setDescricao($dados['descricao'])
                              ->setPrioridade($dados['prioridade']);

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
        $tarefa = $entityManager->getRepository(Tar::class)->findOneBy(array("projeto"=>$dados['id_projeto'],"id"=>$id));
        
        if(!$tarefa){
            throw new \Exception("tarefa not Found", 404);
        }
        $tarefa->setNome($dados['nome']);
        $tarefa->setPrioridade($dados['prioridade']);
        $tarefa->setDescricao($dados['descricao']);
        $entityManager->persist($tarefa);
        $entityManager->flush();
        $return = $response->withJson($tarefa, 201)
                           ->withHeader('Content-type', 'application/json');
        return $return; 
        
    }
    public function visualizar($request, $response, $args){
        $idUsuario = $this->getIDToken($request->getHeader('X-token'));
        $entityManager = $this->container->get('em');
        $idProjeto = $request->getHeader('id_projeto'); 
        $id = (int) $args['id'];
        $tarefa = $entityManager->createQuery('select t. id, t.nome, t.descricao, t.dataCriacao, t.prioridade 
                                             from App\Models\Entity\Tarefa t
                                             join App\Models\Entity\Projeto p
                                             with p.id = t.projeto
                                             join App\Models\Entity\Usuario u
                                             with u.id = p.usuario
                                             where u.id = :idUsuario and  t.id = :id and p.id = :idProjeto');
        $tarefa->setParameters(array(
               'idUsuario' => $idUsuario ,
               'id' => $id,
               'idProjeto' => $idProjeto,
                ));
        if(!$tarefa){
                    throw new \Exception("tarefa not Found", 404);
        }

        $return = $response->withJson($tarefa->getResult(), 201)
                                             ->withHeader('Content-type', 'application/json');
        return $return;     
       
    }
    public function listar($request, $response, $args){
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $idProjeto = $request->getHeader('id_projeto'); 
        $entityManager = $this->container->get('em');
        $tarefa = $entityManager->createQuery('select p.id as idProjeto, t. id, t.nome, t.descricao, t.dataCriacao, t.prioridade 
                                                from App\Models\Entity\Tarefa t
                                                join App\Models\Entity\Projeto p
                                                with p.id = t.projeto
                                                join App\Models\Entity\Usuario u
                                                with u.id = p.usuario
                                                where u.id = :idUsuario and p.id = :idProjeto');
        $tarefa->setParameters(array(
        'idUsuario' => $idUsuario,
        'idProjeto' => $idProjeto,
        ));

   
        $return = $response->withJson($tarefa->getResult(), 200) 
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