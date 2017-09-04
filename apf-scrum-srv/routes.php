<?php

$app->group('/v1', function() {
      $this->group('/usuario', function() {
        $this->post('', '\App\Controller\Usuario:cadastrar');
      });
      $this->group('/login', function() {
        $this->post('', '\App\Controller\Usuario:checar');
    });
    $this->group('/projeto', function() {
      $this->get('', '\App\Controller\Projeto:listar');
      $this->get('/{id:[0-9]+}', '\App\Controller\Projeto:visualizar');
      $this->post('', '\App\Controller\Projeto:criar');
      $this->put('/{id:[0-9]+}', '\App\Controller\Projeto:atualizar');
      $this->delete('/{id:[0-9]+}', '\App\Controller\Projeto:Arquivar');
    });
    $this->group('/tarefa', function() {
      $this->get('', '\App\Controller\Tarefa:listar');
      $this->get('/{id:[0-9]+}', '\App\Controller\Tarefa:visualizar');
      $this->post('', '\App\Controller\Tarefa:criar');
      $this->put('/{id:[0-9]+}', '\App\Controller\Tarefa:atualizar');
      $this->delete('/{id:[0-9]+}', '\App\Controller\Tarefa:Arquivar');
    });

    $this->group('/poscrummaster', function() {
      $this->post('', '\App\Controller\Equipe:getScrumMaster');
      $this->delete('', '\App\Controller\Equipe:removerScrumMaster');
    });
});