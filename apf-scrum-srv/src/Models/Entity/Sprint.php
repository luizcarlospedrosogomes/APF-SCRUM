<?php
namespace App\Models\Entity;
use Doctrine\Common\Collections\ArrayCollection;


/**
   * @Entity @Table(name="sprint")
**/

class Sprint{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="datetime",  length=20)**/
    public $dataCriacao;
    /**
     * @ManyToOne(targetEntity="Tarefa", cascade={"persist"})
     * @JoinColumn(name="item_backlog", referencedColumnName="id")
     */
    public $item_backlog = null;
    
    /** @pronto @Column(type="integer")**/
    public $pronto = null;

    /** @Column(type="datetime",  length=20)**/
    public $dataEntrega = null;

    public function __construct()
     {
        $this->dataCriacao = new \DateTime();
        $this->dataEntrega = new \DateTime();
        $this->pronto = 0;
     }

     public function setItemBacklog($item_backlog){
        $this->item_backlog = $item_backlog;
        return $this;
    }
    
    public function getItembacklog(){
        return $this->item_backlog;
    } 

    public function setPronto($pronto){
        $this->pronto = $pronto;
        return $this;
    }
    public function getPronto(){
        return $this->pronto;
    }

    public function setDataEntrega($dataEntrega){
        $this->dataEntrega = $dataEntrega;
        return $this;
    }
    public function getDataEntrega(){
        return $this->dataEntrega;
    }
}