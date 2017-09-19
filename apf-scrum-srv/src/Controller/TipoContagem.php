<?php
namespace App\Controller;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

use App\Models\Entity\SprintTarefa as SprTarefa;

class TipoContagem{
     
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
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $idTarefa = (int) $args['id_tarefa'];   
        //var_dump($dados);
        $entityManager = $this->container->get('em');
        $tarefa = $entityManager->getRepository(SprTarefa::class)->find($idTarefa);
        if(!$tarefa){
            throw new \Exception("Tarefa não encontrada", 404);
        }
        $class = "App\Models\Entity\TipoContagem".$dados['tipoContagem'];
        
        $tipocontagem = (new $class ())->setDescricao($dados['descricaoALI'])
                                ->setDescricaoTD($dados['descricaoTD'])
                                ->setDescricaoTR($dados['descricaoTR'])
                                ->setTD($dados['TD'])
                                ->setTR($dados['TR'])
                                ->setTarefa($tarefa);
        $entityManager->persist($tipocontagem);
        $entityManager->flush();
        $return = $response->withJson($tipocontagem, 200)
                           ->withHeader('Content-type', 'application/json');
        return $return;    
    }

    public function listar($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $idTarefa = (int) $args['id_tarefa'];
        $entityManager = $this->container->get('em');   
        $tarefa = $entityManager->getRepository(SprTarefa::class)->find($idTarefa);
        if(!$tarefa){
            throw new \Exception("Tarefa não encontrada", 404);
        }
        $class = "App\Models\Entity\TipoContagem".$args['tipoContagem'];
        
        $contagem  =  $entityManager->getRepository($class)->findBy(array('tarefa'=>$idTarefa));
        if(!$contagem){
            throw new \Exception("Sem contagem para esta tarefa", 404);
        }
        $contagemDB = json_decode(json_encode($contagem), true);
       
        $pontos = 0;
        for ($i = 0; $i < count($contagem); $i++) {
            $com = $this->complexidadeALI($contagemDB[$i]['td'], $contagemDB[$i]['tr']);
            array_push($contagemDB[$i], array('complexidade' =>$com['complexidade'], 'ponto' => $com['pontos']));
            $pontos += $com['pontos'];
        }
        $return = $response->withJson( ['dados' => $contagemDB, 'pontos' =>$pontos], 200)
                        ->withHeader('Content-type', 'application/json');
        
       // return $return;    
    }

    function complexidadeALI($td, $tr){
        echo "TD ".$td;
        echo " TR". $tr;
        if($tr = 1){
            if ($td = 1 || $td < 19){
            return array("complexidade"=>"baixa", "pontos" =>7);
            }
            if ($td > 19 || $td < 50){
                return array("complexidade"=>"baixa", "pontos" =>7);
            }
            if($td > 50){
                return array("complexidade"=>"media", "pontos" =>10);
            }
        }
        if($tr > 1 || $tr <= 5){
            if ($td = 1 || $td < 19){
                return array("complexidade"=>"baixa", "pontos" =>7);
            }
            if ($td > 19 || $td < 50){
                return array("complexidade"=>"media", "pontos" =>10);
            }
            if($td > 50){
                return array("complexidade"=>"alta", "pontos" =>15);
            }
        }
        if($tr > 6){
            if ($td = 1 || $td < 19){
                return array("complexidade"=>"media", "pontos" =>10);
            }
            if ($td > 19 || $td < 50){
                return array("complexidade"=>"alta", "pontos" =>15);
            }
            if($td > 50){
                return array("complexidade"=>"alta", "pontos" =>15);
            }
        }
            
    }
    
    
    function getIDToken($token){
        $key = $this->container->get("secretkey");
        $decoded = JWT::decode($token[0], $key, array('HS256'));
        $decoded_array = (array) $decoded;
        return $decoded_array['id'];
    }

}