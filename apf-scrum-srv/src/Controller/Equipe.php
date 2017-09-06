<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

use App\Models\Entity\Equipe as Equi;

class Equipe{
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

    public function atualizarScrumMaster($request, $response, $args){
        $dados = json_decode($request->getBody(),true);
        $entityManager = $this->container->get('em');
        $scrumMaster = $entityManager->getRepository('App\Models\Entity\Usuario')
                                     ->findOneBy(array('email' => $dados['email']
                                                        ,'tipoUsuario' => 2)
                                    );
        $equipe = $entityManager->getRepository('App\Models\Entity\Equipe')
                                    ->findOneBy(array('projeto' =>$args['id_projeto']));
        if(!$scrumMaster){
            throw new \Exception("scrumMaster not Found", 404);
        }
        if(!$equipe){
            throw new \Exception("equipe nao encontrada", 404);
        }
        $equipe->setScrumMaster($scrumMaster);         //   $entityManager->merge($equipe);
        $entityManager->persist($equipe);
        $entityManager->flush();
        $return = $response->withJson($equipe->getScrumMaster(), 201)
                           ->withHeader('Content-type', 'application/json');
        return $return;         
    }

    public function getScrumMaster($request, $response, $args){
        $idProjeto = (int) $args['id_projeto'];
        $entityManager = $this->container->get('em');
        $projeto = $entityManager->getRepository('App\Models\Entity\Equipe')
                                ->findOneBy(array('projeto' =>$idProjeto));
    
        if(!$projeto->getScrumMaster()){
            throw new \Exception("scrum master nao encontrado", 404);
        }
        $scrumMaster = $entityManager->getRepository('App\Models\Entity\Usuario')
                                     ->find($projeto->getScrumMaster());
        if(!$scrumMaster){
            throw new \Exception("scrum master nao encontrado", 404);
        }
        $return = $response->withJson(array('email' => $scrumMaster->getEmail()), 201)
                            ->withHeader('Content-type', 'application/json');
        return $return;
       
    }

    public function removerScrumMaster($request, $response, $args){
        $idProjeto = (int) $args['id_projeto'];
        $dados = json_decode($request->getBody(),true);
        $entityManager = $this->container->get('em');
        $scrumMaster = $entityManager->getRepository('App\Models\Entity\Usuario')
                                     ->findOneBy(array('email' => $dados['email']
                                                        ,'tipoUsuario' => 2)
                                    );
        if(!$scrumMaster){
            throw new \Exception("scrumMaster not Found", 404);
        }

        $equipe = $entityManager->getRepository('App\Models\Entity\Equipe')
                                ->findOneBy(array('scrumMaster' => $scrumMaster->id, 'projeto' =>$idProjeto));
       if(!$equipe){
             throw new \Exception("projeto ou scrum master invalidos!", 404);
        }
        $equipe->setScrumMaster(NULL);
        $entityManager->persist($equipe);
        $entityManager->flush();
        $return = $response->withJson($equipe, 201)
                           ->withHeader('Content-type', 'application/json');
        return $return;
    }
}