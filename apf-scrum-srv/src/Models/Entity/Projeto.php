<?php
namespace App\Models\Entity;
use Doctrine\Common\Collections\ArrayCollection;


/**
   * @Entity @Table(name="projeto")
**/

class Projeto{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="string",  length=100)**/
    public $nome;
    /** @Column(type="datetime",  length=20)**/
    public $dataCriacao;

    /**
     * @ManyToOne(targetEntity="Usuario", cascade={"persist"})
     * @JoinColumn(name="usuario", referencedColumnName="id")
     */
    public $usuario;

    public function __construct()
    {
       $this->dataCriacao = new \DateTime();
       $this->usuario = new ArrayCollection();
    }
    public function getId(){
        return $this->id;
    }

    public function getDataCriacao(){
        return $this->id;
    }

    public function getUsuario(){
        return $this->usuario;
    }

    public function getNnome(){
        return $this->nome;
    }

    public function setNome($nome){
        if(!$nome && !is_string($nome)){
            throw new \InvalidArgumentException("nome do projeto requerido", 400);
        }
        $this->nome = $nome;
        return $this;
    }
  public function setUsuario($usuario){
        if(!$usuario && !is_string($usuario)){
            throw new \InvalidArgumentException("usuario requerido", 400);
        }
        $this->usuario = $usuario;
        return $this;
    }
    public function getValues(){
        return get_object_vars($this);
    }
 

   
}