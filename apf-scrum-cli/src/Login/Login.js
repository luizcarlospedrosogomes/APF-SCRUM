import React, { Component } from 'react';
import FormCadastro from './FormCadastro';

export default  class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {msg: '', status:'', cod:''};
    }
      login(event){
        console.log(this.email.value);
        event.preventDefault();
        this.setState({status:"carregando"});
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({email: this.email.value, senha:this.senha.value}),
            headers:new Headers({'content-type' : 'application/json'})
        };

        fetch("http://scrum-php.herokuapp.com/v1/login",requestInfo)            
            .then(response =>{
            if(response.status === 200 ||  response.status === 201){
                this.setState({cod:response.status, status:""});
                return response.text();
            }else{
                this.setState({status:"", cod:response.status});
                throw new Error('Não foi possivel fazer o login. Verifique usuario e senha.');
            }
        }).then(dados =>{
            console.log(dados.tipousuario);
            console.log(dados.jwt);
            localStorage.setItem('token',dados.jwt);
            if(dados.tipousuario == 1)
                 this.props.history.push('/productOwner');
            if(dados.tipousuario == 2)
                this.props.history.push('/scrumMaster');
            if(dados.tipousuario == 3)
                this.props.history.push('/desenvolvedor');
            
        }).catch(error => {
            this.setState({msg:error.message, cod:500, status:""});
        })
    }         
  
    
      render(){
         return(
            <div>
                <div className="header">
                    Gerenciador Projetos Scrum
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <div className="panel-title">Login</div>
                            </div>
                            
                            <div className="panel-body">
                                <form className="form-group" onSubmit={this.login.bind(this)}>
                                    <input className="form-control" 
                                         type="email"
                                         placeholder="Email"
                                         ref={(input) => this.email = input} 
                                         required="true"
                                    />
                                    <input className="form-control" 
                                            type="password"  
                                            placeholder="Senha" 
                                            ref={(input) => this.senha = input}
                                            required="true"
                                    />
                                    <button type="submit" 
                                            className=" btn-fill btn-block btn btn-info btn-lg">
                                            Entrar
                                    </button>                       
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