<?php
namespace App\Models\Entity;
use Doctrine\Common\Collections\ArrayCollection;


/**
   * @Entity @Table(name="sprint_tarefa")
**/

class SprintTarefa{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="datetime",  length=20)**/
    public $dataCriacao;
      /** @Column(type="text",  length=20)**/
      public $descricao;
    /**
     * @ManyToOne(targetEntity="SprintBacklog", cascade={"persist"})
     * @JoinColumn(name="sprintBacklog", referencedColumnName="id")
     */
     public $sprintBacklog = null;
     /**
     * @ManyToOne(targetEntity="Usuario", cascade={"persist"})
     * @JoinColumn(name="desenvolvedor", referencedColumnName="id")
     */
     public $desenvolvedor = null;

     /** @Column(type="string",  length=20)**/
     public $nome;

     public function __construct()
     {
        $this->dataCriacao = new \DateTime();
     }

    public function setSprintBacklog($sprintBacklog){
        $this->sprintBacklog = $sprintBacklog;
        return $this;
    }
    
    public function getSprintBacklog(){
        return $this->sprintBacklog;
    } 

    public function setDesenvolvedor($desenvolvedor){
        $this->desenvolvedor = $desenvolvedor;
        return $this;
    }
    
    public function getDesenvolvedor(){
        return $this->desenvolvedor;
    } 

    public function setNome($nome){
        $this->nome = $nome;
        return $this;
    }
    
    public function getNome(){
        return $this->nome;
    }
    public function getDescricao(){
        return $this->descricao;
    } 

    public function setDescricao($descricao){
        $this->descricao = $descricao;
        return $this;
    } 
}