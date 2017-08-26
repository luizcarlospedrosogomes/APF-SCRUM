<?php
namespace App\Models\Entity;


/**
   * @Entity @Table(name="usuario")
**/

class Usuario{
    /** @id @Column(type="integer") @GeneratedValue(strategy="AUTO")**/
    public $id;
    /** @Column(type="string",  length=100)**/
    public $email;
    /** @Column(type="string",  length=20)**/
    public $senha;
    /** @Column(type="string",  length=20)**/
    public $tipoUsuario;
   
    public function getId(){
        return $this->id;
    }

    public function getEmail(){
        return $this->email;
    }

    public function getTipoUsuario(){
        return $this->tipoUsuario;
    }

    public function setEmail($email){
        if(!$email && !is_string($email)){
            throw new \InvalidArgumentException("email requerido", 400);
        }
        $this->email = $email;
        return $this;
    }

    public function setSenha($senha){
        if(!$senha && !is_string($senha)){
            throw new \InvalidArgumentException("senha requerido", 400);
        }
        $this->senha = $senha;
        return $this;
    }

    public function setTipoUsuario($tipoUsuario){
        if(!$tipoUsuario && !is_string($tipoUsuario)){
            throw new \InvalidArgumentException("tipo requerido", 400);
        }
        $this->tipoUsuario = $tipoUsuario;
        return $this;
    }

    public function getValues(){
        return get_object_vars($this);
    }
 

   
}