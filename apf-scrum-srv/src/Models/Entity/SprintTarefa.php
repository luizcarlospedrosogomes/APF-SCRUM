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
    /**
     * @ManyToOne(targetEntity="Sprint", cascade={"persist"})
     * @JoinColumn(name="sprint", referencedColumnName="id")
     */
     public $sprint = null;
    
     public function __construct()
     {
        $this->dataCriacao = new \DateTime();
     }

     public function setSprint($sprint){
        $this->sprint = $sprint;
        return $this;
    }
    
    public function getSprint(){
        return $this->sprint;
    } 

}