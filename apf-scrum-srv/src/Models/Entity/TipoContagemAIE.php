<?php
namespace App\Models\Entity;
use Doctrine\Common\Collections\ArrayCollection;


/**
   * @Entity @Table(name="tipo_contagem_aie")
**/

class TipoContagemAIE{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="datetime",  length=20)**/
    public $dataCriacao;
  
    /** @Column(type="text")**/
    public $descricao;
    /**
     * @ManyToOne(targetEntity="SprintTarefa", cascade={"persist"})
     * @JoinColumn(name="tarefa", referencedColumnName="id")
     */
    public $tarefa;
    /** @Column(type="integer")**/
    public $td;
    /** @Column(type="integer")**/
    public $tr;
    /** @Column(type="text")**/
    public $descricaoTD;
    /** @Column(type="text")**/
    public $descricaoTR;

    public function __construct(){
        $this->dataCriacao = new \DateTime();
    }
   
    public function getTR(){
        return $this->tr;
    }

    public function setTR($tr){
        $this->tr = $tr;
        return $this;
    }
    
    public function getTD(){
        return $this->td;
    }

    public function setTD($td){
        $this->td = $td;
        return $this;
    }

    public function getTarefa(){
        return $this->tarefa;
    }

    public function setTarefa($tarefa){
        $this->tarefa = $tarefa;
        return $this;
    }

    public function getDescricaoTD(){
        return $this->descricaoTD;
    }

    public function setDescricaoTD($descricaoTD){
        $this->descricaoTD = $descricaoTD;
        return $this;
    } 
    public function getDescricaoTR(){
        return $this->descricaoTR;
    }

    public function setDescricaoTR($descricaoTR){
        $this->descricaoTR = $descricaoTR;
        return $this;
    } 
    public function getDescricao(){
        return $this->descricao;
    } 

    public function setDescricao($descricao){
        $this->descricao = $descricao;
        return $this;
    } 

    
}