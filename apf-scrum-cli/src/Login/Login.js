import React, { Component } from 'react';
import FormCadastro from './FormCadastro';
import Mensagens from './../Componentes/Mensagens';
import Progess from './../Componentes/Progress';

export default  class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {msg: '', status:'', cod:''};
    }
      login(event){
        event.preventDefault();
        this.setState({status:'enviando'});
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({email: this.email.value, senha:this.senha.value}),
            headers:new Headers({'content-type' : 'application/json'})
        };

        fetch("http://scrum-php.herokuapp.com/v1/login",requestInfo)            
            .then(response =>{
            if(response.status === 200 ||  response.status === 201){
                this.setState({cod:response.status, status:"enviado"});
                return response.json();
            }else
                this.setState({status:"enviado", cod:response.status});
                
            
        }).then(dados =>{
            if(dados){
                localStorage.setItem('token',dados.jwt);
                if(dados.tipousuario === '1')
                    this.props.history.push('/productOwner');
                if(dados.tipousuario === '2')
                    this.props.history.push('/scrumMaster');
                if(dados.tipousuario === '3')
                    this.props.history.push('/scrumTeam');
            }
        })
    }         
  
    
      render(){
         return(
            <div>
                <div className="header">
                   <h1>Logo@</h1>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            
                            <h4 className="card-header bg-info">Login</h4>                            
                            <Progess status={this.state.status}/>
                            <div className="card-block">
                            
                            <span><Mensagens cod={this.state.cod}/></span>

                                <form onSubmit={this.login.bind(this)}>
                                    <div className="form-group row">    
                                        <input className="form-control" 
                                         type="email"
                                         placeholder="Email"
                                         ref={(input) => this.email = input} 
                                         required="true"
                                        
                                         />
                                    </div>
                                
                                <div className="form-group row"> 
                                    <input className="form-control" 
                                            type="password"  
                                            placeholder="Senha" 
                                            ref={(input) => this.senha = input}
                                            required="true"
                                    />
                                </div>  
                                <div className="form-group row"> 
                                    <button type="submit" 
                                    className={`btn btn-info btn-fill btn-block btn-lg ${this.state.status ==='enviando' ?'disabled': ''}`}>
                                            
                                            Entrar
                                    </button>                       
                                </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <FormCadastro/>                       
                    </div>
                </div>
            </div>
            );
    }
}