<?php
namespace App\Models\Entity;
use Doctrine\Common\Collections\ArrayCollection;


/**
   * @Entity @Table(name="tarefa")
**/

class Tarefa{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="string",  length=100)**/
    public $nome;
    /** @Column(type="datetime",  length=20)**/
    public $dataCriacao;
    /** @Column(type="string",  length=100)**/
    public $descricao;
    /** @Column(type="integer")**/
    public $prioridade;
        
    // ...

    /**
     * @ManyToOne(targetEntity="Projeto", cascade={"persist"})
     * @JoinColumn(name="projeto", referencedColumnName="id")
     */
    public $projeto;

    public function __construct()
    {
       $this->dataCriacao = new \DateTime();
      // $this->usuario = new ArrayCollection();
       //$this->projeto = new ArrayCollection();
    }
    public function getId(){
        return $this->id;
    }

    public function getDataCriacao(){
        return $this->id;
    }

    public function getProjeto(){
        return $this->projeto;
    }

    public function getNnome(){
        return $this->nome;
    }

    public function getPrioridade(){
        return $this->prioridade;
    }

    public function getDescricao(){
        return $this->descricao;
    }

    public function getUsuario(){
        return $this->usuario;
    }
    public function setNome($nome){
        if(!$nome && !is_string($nome)){
            throw new \InvalidArgumentException("nome da tarefa requerido", 400);
        }
        $this->nome = $nome;
        return $this;
    }

    public function setProjeto($projeto){
        if(!$projeto && !is_string($projeto)){
            throw new \InvalidArgumentException("projeto requerido", 400);
        }
        $this->projeto = $projeto;
        return $this;
    }

    public function setPrioridade($prioridade){
        $this->prioridade = $prioridade;
        return $this;
    }

    public function setDescricao($descricao){
        if(!$descricao && is_string($descricao)){
            throw new \InvalidArgumentException("prioridade requerido", 400);
        }
        $this->descricao = $descricao;
        return $this;
    }
    
    public function getValues(){
        return get_object_vars($this);
    }
 

   
}