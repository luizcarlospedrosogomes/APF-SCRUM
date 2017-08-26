<?php

$app->group('/v1', function() {
  $this->group('/usuario', function() {
     $this->post('', '\App\Controller\Usuario:cadastrar');
  });
});