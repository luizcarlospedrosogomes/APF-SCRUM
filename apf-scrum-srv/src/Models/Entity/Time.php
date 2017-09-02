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
     /** @Column(type="string",  length=100)**/

    /**
     * @ManyToOne(targetEntity="Usuario", cascade={"persist"})
     * @JoinColumn(name="usuario", referencedColumnName="id")
     */
    public $membro;

     public function __construct()
     {
        $this->dataCriacao = new \DateTime();
     }

     public function setMembro($membro){
        $this->membro = $membro;
        return $this;
    }
    
    public function getMembro(){
        return $this->membro;
    } 
}