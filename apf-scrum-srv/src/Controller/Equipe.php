<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

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

    public function removerScrumMaster($request, $response, $args){
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
                                ->findOneBy(array('scrumMaster' => $scrumMaster->id));
       
        $equipe->setScrumMaster(NULL);
        $entityManager->persist($equipe);
        $entityManager->flush();
        $return = $response->withJson($equipe, 201)
                           ->withHeader('Content-type', 'application/json');
        return $return;
    }
}