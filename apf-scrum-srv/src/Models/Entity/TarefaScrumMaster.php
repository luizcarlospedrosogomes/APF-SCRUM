<?php
namespace App\Models\Entity;
use Doctrine\Common\Collections\ArrayCollection;


/**
   * @Entity @Table(name="tarefa_scrummaster")
**/

class TarefaScrumMaster{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="integer")**/
    public $status = null;// 1 assumida - 2 disponivel
    /** @Column(type="integer")**/
    public $statusConclusao=null;// 1 concluida pelo desenvolvedor - 2 rejeita pelo po - 3 aceita pelo po
    /**
     * @ManyToOne(targetEntity="SprintTarefa", cascade={"persist"})
     * @JoinColumn(name="tarefa", referencedColumnName="id")
     */
     public $tarefa =null;
     /** @Column(type="datetime",  length=20)**/
    public $dataInicio = null;
    /** @Column(type="datetime",  length=20)**/
    public $dataFim = null;
    /**
     * @ManyToOne(targetEntity="Usuario", cascade={"persist"})
     * @JoinColumn(name="desenvolvedorAtual", referencedColumnName="id")
     */
     public $desenvolvedorAtual = null;
     
     public function __construct(){
        $this->statusConclusao = 0;
        $this->dataInicio      = new \DateTime();
        $this->dataFim         = new \DateTime();
    }

    public function getId(){
         return $this->id;
    }

    public function getStatus(){
        return $this->status;
    }
    public function setStatus($status){
        $this->status = $status;
        return $this;
    }
    
    public function getStatusConclusao(){
        return $this->statusConclusao;
    }
   
    public function setStatusConclusao($statusConclusao){
        $this->statusConclusao = $statusConclusao;
        return $this;
    }
   
    public function getTarefa(){
        return $this->tarefa;
    }
    public function setTarefa($tarefa){
        $this->tarefa = $tarefa;
        return $this;
    }

    public function getDesenvolvedorAtual(){
        return $this->desenvolvedorAtual;
    }
    public function setDesenvolvedorAtual($desenvolvedorAtual){
        $this->desenvolvedorAtual = $desenvolvedorAtual;
        return $this;
    }

    public function getDataInicio(){
        return $this->dataInicio;
    }
    public function setDataInicio($dataInicio){
        $this->dataInicio = $dataInicio;
        return $this;
    }
    public function getDataFim(){
        return $this->dataFim;
    }
    public function setDataFim($dataFim){
        $this->dataFim = $dataFim;
        return $this;
    }
}