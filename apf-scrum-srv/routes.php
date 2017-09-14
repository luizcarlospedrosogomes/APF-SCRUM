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
     $this->get('/projeto', '\App\Controller\ScrumMaster:listarProjeto');
     $this->post('/projeto/time', '\App\Controller\ScrumMaster:associarTimeAProjeto');
     $this->post('/time', '\App\Controller\Time:criar');
     $this->get('/time', '\App\Controller\Time:listar');
     $this->delete('/time/{id_time:[0-9]+}', '\App\Controller\Time:removerTimeProjeto');
     $this->get('/time/{id:[0-9]+}', '\App\Controller\Time:visualizar');
     $this->post('/time/membro', '\App\Controller\Time:adicionarMembro');
     $this->get('/time/membro/{id_time:[0-9]+}', '\App\Controller\Time:listarMembro');
     $this->delete('/time/membro/{id_membro:[0-9]+}', '\App\Controller\Time:excluirMembro');
     $this->post('/sprint', '\App\Controller\Time:criar');
     $this->post('/sprint/{id_projeto:[0-9]+}', '\App\Controller\Sprint:criar');
     $this->put('/sprint/{id:[0-9]+}', '\App\Controller\Time:criar');
     $this->delete('/sprint/{id:[0-9]+}', '\App\Controller\Time:criar');
     $this->post('/sprint/tarefa', '\App\Controller\Time:criar');
     $this->post('/sprint/tarefa/{id:[0-9]+}', '\App\Controller\Time:criar');
     $this->put('/sprint/tarefa/{id:[0-9]+}', '\App\Controller\Time:criar');
     $this->get('/backlog/{id_projeto:[0-9]+}', '\App\Controller\Tarefa:Listar');
     $this->get('/sprint/backlog/{id_sprint:[0-9]+}', '\App\Controller\SprintBacklog:Listar');
     $this->delete('/sprint/tarefa/{id:[0-9]+}', '\App\Controller\Time:criar');
     
    });
   
});