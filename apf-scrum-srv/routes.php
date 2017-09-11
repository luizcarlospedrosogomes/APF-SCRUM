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
      $this->get('/projeto/{id_projeto:[0-9]+}', '\App\Controller\Tarefa:listar');
      $this->get('/{id:[0-9]+}', '\App\Controller\Tarefa:visualizar');
      $this->post('', '\App\Controller\Tarefa:criar');
      $this->put('/{id:[0-9]+}', '\App\Controller\Tarefa:atualizar');
      $this->delete('/{id:[0-9]+}', '\App\Controller\Tarefa:arquivar');
    });

    $this->group('/equipe/scrummaster', function() {
      $this->post('/{id_projeto:[0-9]+}', '\App\Controller\Equipe:atualizarScrumMaster');
      $this->get('/{id_projeto:[0-9]+}', '\App\Controller\Equipe:getScrumMaster');
      $this->delete('/{id_projeto:[0-9]+}', '\App\Controller\Equipe:removerScrumMaster');
    });

    $this->group('/scrummaster', function() {
     $this->get('/projeto', '\App\Controller\ScrumMaster:listar');
     $this->post('/time', '\App\Controller\Time:criar');
     $this->get('/time', '\App\Controller\Time:listar');
     $this->get('/time/{id:[0-9]+}', '\App\Controller\Time:visualizar');
     $this->post('/time/membro', '\App\Controller\Time:adicionarMembro');
     //$this->delete('/time/{id:[0-9]+}', '\App\Controller\Time:arquivar');
    });
   
});