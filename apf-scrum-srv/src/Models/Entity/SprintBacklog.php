<?php
namespace App\Models\Entity;
use Doctrine\Common\Collections\ArrayCollection;


/**
   * @Entity @Table(name="sprint_backlog")
**/

class SprintBacklog{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="datetime",  length=20)**/
    public $dataCriacao;
    /**
     * @ManyToOne(targetEntity="Tarefa", cascade={"persist"})
     * @JoinColumn(name="item_backlog", referencedColumnName="id")
     */
     public $item_backlog = null;
    
     /**
     * @ManyToOne(targetEntity="Sprint", cascade={"persist"})
     * @JoinColumn(name="sprint", referencedColumnName="id")
     */
     public $sprint = null;

     public function __construct()
     {
        $this->dataCriacao = new \DateTime();
     }

    public function setItemBacklog($item_backlog){
        $this->item_backlog = $item_backlog;
        return $this;
    }
    
    public function getItembacklog(){
        return $this->item_backlog;
    } 

    public function setSprint($sprint){
        $this->sprint = $sprint;
        return $this;
    }
    
    public function getSprint(){
        return $this->sprint;
    } 

}