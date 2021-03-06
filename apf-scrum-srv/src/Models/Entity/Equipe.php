<?php
namespace App\Models\Entity;
use Doctrine\Common\Collections\ArrayCollection;


/**
   * @Entity @Table(name="equipe")
**/

class Equipe{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="string",  length=100)**/
    public $nome;
    /** @Column(type="datetime",  length=20)**/
    public $dataCriacao;
     /** @Column(type="string",  length=100)**/

    /**
     * @ManyToOne(targetEntity="Usuario", cascade={"persist"})
     * @JoinColumn(name="scrummaster", referencedColumnName="id")
     */
    public $scrumMaster = null;
    /**
     * @ManyToOne(targetEntity="Usuario", cascade={"persist"})
     * @JoinColumn(name="productOwer", referencedColumnName="id")
     */
    public $productOwner = null;

    /**
     * @ManyToOne(targetEntity="Time", cascade={"persist"})
     * @JoinColumn(name="time", referencedColumnName="id")
     */
    public $time = null;

    /**
     * @ManyToOne(targetEntity="Projeto", cascade={"persist"})
     * @JoinColumn(name="projeto", referencedColumnName="id")
     */
     public $projeto = null;
    
     public function __construct()
     {
        $this->dataCriacao = new \DateTime();
        $this->nome = "equipe";
       // $this->scrumMaster = new ArrayCollection();
       // $this->productOwner = new ArrayCollection();
       //$this->time = new ArrayCollection();
     }

     public function setScrumMaster($scrumMaster){
        $this->scrumMaster = $scrumMaster;
        return $this;
    }
    
    public function getScrumMaster(){
        return $this->scrumMaster;
    } 

    public function getProjeto(){
        return $this->projeto;
    } 
    public function setProductOwner($productOwner){
        $this->productOwner = $productOwner;
        return $this;
    }
    public function getTime(){
        return $this->time;
    } 
    public function setTime($time){
        $this->time = $time;
        return $this;
    }
    
    public function getProductOwner(){
        return $this->productOwner;
    } 

    public function setProjeto($projeto){
        $this->projeto = $projeto;
        return $this;
    }
}