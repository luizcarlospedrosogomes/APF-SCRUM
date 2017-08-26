import React, { Component } from 'react';
import FormCadastro from './FormCadastro';

export default  class Login extends Component{
    
      login(event){
        event.preventDefault();
        this.setState({status:"carregando"});
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({email: this.email.value, senha:this.senha.value}),
            headers:new Headers({'content-type' : 'application/json'})
        };
        console.log("SERVIDOR: "+ this.host);
        console.log("URL :"+this.baseUrl+"/login")
        console.log("DADOS ENVIADOS: "+requestInfo.body);
        console.log("VERBO: POST")
        
        fetch(this.host+this.baseUrl+"/login",requestInfo)            
            .then(response =>{
            if(response.status === 200 ||  response.status === 201){
                this.setState({cod:response.status, status:""});
                console.log("sucesso no login");
                return response.text();
            }else{
                this.setState({status:"", cod:response.status});
                throw new Error('Não foi possivel fazer o login. Verifique usuario e senha.');
            }
        }).then(token =>{
            console.log(token)
            if(this.props.match.params.login === 'representante'){
                localStorage.setItem('token-representante',token);
                localStorage.setItem('email-representante',this.email.value);
                this.props.history.push('/representante');
            }else if(this.props.match.params.login === 'cliente'){
                localStorage.setItem('token-cliente',token);
                localStorage.setItem('email-cliente', this.email.value);
                this.props.history.push('/cliente/'+this.email.value);
            }
        }).catch(error => {
            this.setState({msg:error.message, cod:500, status:""});
        })
    }         
  
    
      render(){
         return(
            <div>
                <div className="header">
                    <h1>Gerenciador Projetos Scrum</h1>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <div className="panel-title">Login</div>
                            </div>
                            
                            <div className="panel-body">
                                <form className="form-group">
                                    <input className="form-control" type="text" placeholder="Email" required="true"/>
                                    <input className="form-control" type="password"  placeholder="Senha" required="true"/>
                                    <button type="submit" className=" btn-fill btn-block btn btn-info btn-lg">Entrar</button>                       
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