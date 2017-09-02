
<?php
require './vendor/autoload.php';
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
use Psr7Middlewares\Middleware\TrailingSlash;
use Monolog\Logger;
use Firebase\JWT\JWT;
/**
 * Configurações
 */
$configs = [
    'settings' => [
          'determineRouteBeforeAppMiddleware' => true,
        'displayErrorDetails' => true,
        'addContentLengthHeader' => false,
    ]   
];
/**
 * Container Resources do Slim.
 * Aqui dentro dele vamos carregar todas as dependências
 * da nossa aplicação que vão ser consumidas durante a execução
 * da nossa API
 */
$container = new \Slim\Container($configs);
/**
 * Converte os Exceptions Genéricas dentro da Aplicação em respostas JSON
 */
$container['errorHandler'] = function ($container) {
    return function ($request, $response, $exception) use ($container) {
        $statusCode = $exception->getCode() ? $exception->getCode() : 500;
        return $container['response']->withStatus($statusCode)
            ->withHeader('Content-Type', 'Application/json')
            ->withJson(["message" => $exception->getMessage()], $statusCode);
    };
};
/**
 * Converte os Exceptions de Erros 405 - Not Allowed
 */
$container['notAllowedHandler'] = function ($container) {
    return function ($request, $response, $methods) use ($container) {
        return $container['response']
            ->withStatus(405)
            ->withHeader('Allow', implode(', ', $methods))
            ->withHeader('Content-Type', 'Application/json')
            ->withHeader("Access-Control-Allow-Methods", implode(",", $methods))
            ->withJson(["message" => "Method not Allowed; Method must be one of: " . implode(', ', $methods)], 405);
    };
};
/**
 * Converte os Exceptions de Erros 404 - Not Found
 */
$container['notFoundHandler'] = function ($container) {
    return function ($request, $response) use ($container) {
        return $container['response']
            ->withStatus(404)
            ->withHeader('Content-Type', 'Application/json')
            ->withJson(['message' => 'Page not found']);
    };
};
/**
 * Serviço de Logging em Arquivo
 */
$container['logger'] = function($container) {
    $logger = new Monolog\Logger('books-microservice');
    $logfile = __DIR__ . '/log/books-microservice.log';
    $stream = new Monolog\Handler\StreamHandler($logfile, Monolog\Logger::DEBUG);
    $fingersCrossed = new Monolog\Handler\FingersCrossedHandler(
        $stream, Monolog\Logger::INFO);
    $logger->pushHandler($fingersCrossed);
    
    return $logger;
};
$isDevMode = true;
/**
 * Diretório de Entidades e Metadata do Doctrine
 */
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/src/Models/Entity"), $isDevMode);
/**
 * Array de configurações da nossa conexão com o banco
 */
$conn = array(
    'driver' => 'pdo_pgsql',
    'host'=>'ec2-54-163-233-201.compute-1.amazonaws.com',
    'user'=>'oqrauqsbobtyer',
    'password'=>'a32ba3ec6585ceea192f46f8de5353ca3f27d472277b18cb5ba5bb3b4844ef40',
    'dbname'=>'d4u312mg4lj62s'
);
/**
 * Instância do Entity Manager
 */
$entityManager = EntityManager::create($conn, $config);
/**
 * Coloca o Entity manager dentro do container com o nome de em (Entity Manager)
 */
$container['em'] = $entityManager;
/**
 * Token do nosso JWT
 */
$container['secretkey'] = "secretloko";
/**
 * Application Instance
 */
$app = new \Slim\App($container);
/**
 * @Middleware Tratamento da / do Request 
 * true - Adiciona a / no final da URL
 * false - Remove a / no final da URL
 */
$app->add(new TrailingSlash(false));
/**
 * Auth básica HTTP
 */

/**
 * Auth básica do JWT
 * Whitelist - Bloqueia tudo, e só libera os
 * itens dentro do "passthrough"
 */
$app->add(new \Slim\Middleware\JwtAuthentication([
    "regexp" => "/(.*)/",
    "header" => "X-Token",
    "path" => "/",
    "passthrough" => ["/v1/login", "/v1/usuario"],
    "realm" => "Protected",
    "secret" => $container['secretkey']
]));
/**
 * Proxys confiáveis
 */
$trustedProxies = ['0.0.0.0', '127.0.0.1','scrum-php.herokuapp.com'];
$app->add(new RKA\Middleware\SchemeAndHost($trustedProxies));

//CORS
$app->add(new \Tuupola\Middleware\Cors([
    "origin" => ["*"],
    "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE","OPTIONS"],
    "headers.allow" =>  ["Accept", "Content-Type", "X-Token"],
    "headers.expose" => [],
    "credentials" => false,
    "cache" => 0,
])); 
