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
        $class = "App\Models\Entity\TipoContagem".$args['tipoContagem'];
        
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
            $com = $this->complexidade($args['tipoContagem'], (int)$contagemDB[$i]['td'], (int)$contagemDB[$i]['tr']);
            array_push($contagemDB[$i], array('complexidade' =>$com['complexidade'], 'ponto' => $com['pontos']));
            $pontos += $com['pontos'];
        }

        $return = $response->withJson( ['dados' => $contagemDB, 'pontos' =>$pontos], 200)
                        ->withHeader('Content-type', 'application/json');
        
        return $return;    
    }

    public function excluir($request, $response, $args){
        $dados = json_decode($request->getBody(),true); 
        $idUsuario = $this->getIDToken($request->getHeader('X-token')); 
        $idContagem = (int) $args['id_contagem'];
        $entityManager = $this->container->get('em'); 
        $class = "App\Models\Entity\TipoContagem".$args['tipoContagem'];
        $contagem  =  $entityManager->getRepository($class)->find($idContagem);
        
        if(!$contagem){
            throw new \Exception("Contagem não encontrada", 404);
        }
        $entityManager->remove($contagem);
        $entityManager->flush();
        
        $return = $response->withJson($contagem, 200)
                            ->withHeader('Content-type', 'application/json');
        return $return;  
    }

    function complexidade($tipo, $td, $tr){
        
        if($tipo == 'ALI' || $tipo == 'AIE'){
            if($tr== 0 || $tr == 1){
                if ($td == 1 || $td <= 19)
                    return array("complexidade"=>"baixa", "pontos" => $this->getTabComplexidade($tipo, 'baixa'));
                if ($td > 19 || $td < 50)
                    return array("complexidade"=>"baixa", "pontos" => $this->getTabComplexidade($tipo, 'baixa'));
                if($td > 50)
                    return array("complexidade"=>"media", "pontos" => $this->getTabComplexidade($tipo, 'media'));
            }
            if($tr > 1 || $tr <= 5){
                if ($td == 1 || $td <= 19)
                    return array("complexidade"=>"baixa", "pontos" => $this->getTabComplexidade($tipo, 'baixa'));
                if ($td > 19 && $td <= 50)
                    return array("complexidade"=>"media", "pontos" => $this->getTabComplexidade($tipo, 'media'));
                if($td > 50)
                    return array("complexidade"=>"alta", "pontos" => $this->getTabComplexidade($tipo, 'alta'));
            }
            if($tr >= 6){
                if ($td == 1 && $td < 19)
                    return array("complexidade"=>"media", "pontos" => $this->getTabComplexidade($tipo, 'media'));
                if ($td > 19 && $td < 50)
                    return array("complexidade"=>"alta", "pontos" => $this->getTabComplexidade($tipo, 'alta'));
                if($td >= 50)
                    return array("complexidade"=>"alta", "pontos" => $this->getTabComplexidade($tipo, 'alta'));
            } 
        } 
        
        if($tipo == 'EE'){
            if($tr== 0 || $tr == 1){
                if ($td == 1 || $td <= 4)
                    return array("complexidade"=>"baixa", "pontos" => $this->getTabComplexidade($tipo, 'baixa'));
                if ($td > 4 || $td <= 15)
                    return array("complexidade"=>"baixa", "pontos" => $this->getTabComplexidade($tipo, 'baixa'));
                if($td > 15)
                    return array("complexidade"=>"media", "pontos" => $this->getTabComplexidade($tipo, 'media'));
            }
            if($tr == 2){
                if ($td == 1 || $td <= 4)
                    return array("complexidade"=>"baixa", "pontos" => $this->getTabComplexidade($tipo, 'baixa'));
                if ($td > 4 && $td <= 15)
                    return array("complexidade"=>"media", "pontos" => $this->getTabComplexidade($tipo, 'media'));
                if($td > 15)
                    return array("complexidade"=>"alta", "pontos" => $this->getTabComplexidade($tipo, 'alta'));
            }
            if($tr >= 3){
                if ($td == 1 && $td <= 4)
                    return array("complexidade"=>"media", "pontos" => $this->getTabComplexidade($tipo, 'media'));
                if ($td > 4 && $td <= 15)
                    return array("complexidade"=>"alta", "pontos" => $this->getTabComplexidade($tipo, 'alta'));
                if($td >= 15)
                    return array("complexidade"=>"alta", "pontos" => $this->getTabComplexidade($tipo, 'alta'));
            } 
        }

        if($tipo == 'SE' || $tipo == 'CE'){
            if($tr== 0 || $tr == 1){
                if ($td == 1 || $td <= 5)
                    return array("complexidade"=>"baixa", "pontos" => $this->getTabComplexidade($tipo, 'baixa'));
                if ($td > 5 || $td <= 19)
                    return array("complexidade"=>"baixa", "pontos" => $this->getTabComplexidade($tipo, 'baixa'));
                if($td > 19)
                    return array("complexidade"=>"media", "pontos" => $this->getTabComplexidade($tipo, 'media'));
            }
            if($tr > 1 || $tr <= 3){
                if ($td == 1 || $td <= 5)
                    return array("complexidade"=>"baixa", "pontos" => $this->getTabComplexidade($tipo, 'baixa'));
                if ($td > 5 && $td <= 19)
                    return array("complexidade"=>"media", "pontos" => $this->getTabComplexidade($tipo, 'media'));
                if($td > 19)
                    return array("complexidade"=>"alta", "pontos" => $this->getTabComplexidade($tipo, 'alta'));
            }
            if($tr >= 3 ){
                if ($td == 1 && $td <= 5)
                    return array("complexidade"=>"media", "pontos" => $this->getTabComplexidade($tipo, 'media'));
                if ($td > 5 && $td <= 19)
                    return array("complexidade"=>"alta", "pontos" => $this->getTabComplexidade($tipo, 'alta'));
                if($td > 19)
                    return array("complexidade"=>"alta", "pontos" => $this->getTabComplexidade($tipo, 'alta'));
            } 
        }
    }
    
     
    function getTabComplexidade($tipo, $nivel){
        if($tipo == 'ALI' && $nivel =='baixa')
            return 7;
        if($tipo == 'ALI' && $nivel =='media')
            return 10;
        if($tipo == 'ALI' && $nivel =='alta')
            return 15;
        if($tipo == 'AIE' && $nivel =='baixa')
            return 5;
        if($tipo == 'AIE' && $nivel =='media')
            return 7;
        if($tipo == 'AIE' && $nivel =='alta')
            return 10;
        if(($tipo == 'EE' || $tipo == 'CE' ) && $nivel =='baixa')
            return 3;
        if(($tipo == 'EE' || $tipo == 'CE' ) && $nivel =='media')
            return 4;
        if(($tipo == 'EE' || $tipo == 'CE' ) && $nivel =='alta')
            return 6;
        if($tipo == 'SE' && $nivel =='baixa')
            return 4;
        if($tipo == 'SE' && $nivel =='media')
            return 5;
        if($tipo == 'SE' && $nivel =='alta')
            return 7;
    }

    function getIDToken($token){
        $key = $this->container->get("secretkey");
        $decoded = JWT::decode($token[0], $key, array('HS256'));
        $decoded_array = (array) $decoded;
        return $decoded_array['id'];
    }

}