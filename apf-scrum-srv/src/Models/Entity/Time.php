<?php
namespace App\Models\Entity;
use Doctrine\Common\Collections\ArrayCollection;


/**
   * @Entity @Table(name="time")
**/

class Time{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="string",  length=100)**/
    public $nome = null;
    /** @Column(type="datetime",  length=20)**/
    public $dataCriacao;
    /**
     * @ManyToOne(targetEntity="Usuario", cascade={"persist"})
     * @JoinColumn(name="scrummaster", referencedColumnName="id")
     */
    public $scrummaster;

     public function __construct()
     {
        $this->dataCriacao = new \DateTime();
     }
    
     public function setNome($nome){
        $this->nome = $nome;
        return $this;
    }
    
    public function getNome(){
        return $this->nome;
    }
    public function setScrumMaster($scrummaster){
        $this->scrummaster = $scrummaster;
        return $this;
    }
    
    public function getScrumMaster(){
        return $this->scrummaster;
    } 
}