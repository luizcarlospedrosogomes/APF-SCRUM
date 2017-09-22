<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

use App\Controller\TipoContagem;
use App\Models\Entity\SprintTarefa as SprTarefa;

class Pontos{
            /**
     * Container Class
     * @var [object]
     */
     private $container;
     /**
      * Undocumented function
      * @param [object] $container
      */
    private $tipo;

    public function __construct($container) {
        $this->container    = $container;
        
    }

    public function pontosTarefaScrumTeam($request, $response, $args){
        $entityManager = $this->container->get('em');
        $tarefa = $entityManager->getRepository(SprTarefa::class)->find((int)$args['id_tarefa']);
        if(!$tarefa){
            throw new \Exception("Tarefa não encontrada", 404);
        }
        $return = $response->withJson($this->pontosTotalTarefa($entityManager, $args['id_tarefa']), 200)
                            ->withHeader('Content-type', 'application/json');
        return $return; 
       // var_dump($args['id_tarefa']);
    }

    function pontosTotalTarefa($entityManager, $IDTarefa){
        $tipoContagem = ['ALI', 'AIE', 'EE', 'CE', 'SE'];
        $pontos = 0;
        foreach($tipoContagem as $tc){
            
            $class = "App\Models\Entity\TipoContagem".$tc;
           // echo $class." <br>";
            $contagem  =  $entityManager->getRepository($class)->findBy(array('tarefa'=>(int)$IDTarefa));
            $contagemDB = json_decode(json_encode($contagem), true);
            //var_dump(count($contagem));
            
            for ($i = 0; $i < count($contagem); $i++) {
              //  echo $tc;
                $com = TipoContagem::complexidade($tc, (int)$contagemDB[$i]['td'], (int)$contagemDB[$i]['tr']);
                $pontos += $com['pontos'];
            }
        }
        return $pontos;
    }
}
