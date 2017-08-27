<?php

$app->group('/v1', function() {
  $this->group('/usuario', function() {
     $this->post('', '\App\Controller\Usuario:cadastrar');
  });
  $this->group('/login', function() {
    $this->post('', '\App\Controller\Usuario:checar');
 });
 $this->group('/protegida', function() {
  $this->post('', '\App\Controller\Usuario:checar');
});
});