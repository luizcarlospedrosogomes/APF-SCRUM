<?php
namespace App\Models\Entity;
use Doctrine\Common\Collections\ArrayCollection;


/**
   * @Entity @Table(name="membro_time")
**/

class MembroTime{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="datetime",  length=20)**/
    public $dataCriacao;

    /**
     * @ManyToOne(targetEntity="Usuario", cascade={"persist"})
     * @JoinColumn(name="desenvolvedor", referencedColumnName="id")
     */
    public $desenvolvedor;

    /**
     * @ManyToOne(targetEntity="Time", cascade={"persist"})
     * @JoinColumn(name="time", referencedColumnName="id")
     */
     public $time;

    public function __construct()
     {
        $this->dataCriacao = new \DateTime();
        //$this->desenvolvedor = new \Doctrine\Common\Collections\ArrayCollection();
     }

    public function setDesenvolvedor($desenvolvedor){
        $this->desenvolvedor = $desenvolvedor;
        return $this;
    }
    
    public function getScrumMaster(){
        return $this->desenvolvedor;
    } 

    public function setTime($time){
        $this->time = $time;
        return $this;
    }
    
    public function getTime(){
        return $this->time;
    }
}