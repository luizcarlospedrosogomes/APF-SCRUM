import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Mensagens from './../Componentes/Mensagens';
import Progess from './../Componentes/Progress';

const styles = {
    customWidth: {
      width: 150,
    },
  };

export default  class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {status:'', cod:''
                    , email:''
                    , senha:''
                    , tipo: 1
                }
     }
     
     salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
     }

      handleChange = (event, index, tipo) => this.setState({tipo}); 

      enviaForm(evento){
        evento.preventDefault();
        this.setState({status:'enviando'})
         const requestInfo = {
            method:'POST',
            body:JSON.stringify({ email:this.state.email 
                                , tipo:this.state.tipo
                                , senha: this.state.senha
                            }),
            headers:new Headers({'content-type' : 'application/json'})
        };

        fetch("http://scrum-php.herokuapp.com/v1/usuario",requestInfo)            
            .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                this.setState({cod:response.status, status:'enviado'});
                return response.text();
            }else{
                this.setState({cod:response.status, status:'enviado'});
            }
        });
        
    }
    
    
      render(){
         return(
            <div>
                    <div className="card">                            
                         <h4 className="card-header bg-success">Cadastro</h4>                          
                            <Progess status={this.state.status}/>
                            <div className="card-block">
                            <span><Mensagens cod={this.state.cod}/></span>
                                <form onSubmit={this.enviaForm.bind(this)}>
                                    
                                <div className="form-control input-lg">
                                        <label className="col-form-label" htmlFor="email">Email</label>
                                        <input id="email" 
                                                className="form-control" 
                                                type="email" placeholder="Email" 
                                                required="true"
                                                value={this.state.email}
                                                onChange={this.salvaAlteracao.bind(this, 'email')}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label  className="col-form-label" htmlFor="ftime">Função no time</label>
                                        <div className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg">
                                        <select className="custom-select mb-2 mr-sm-2 mb-sm-0" 
                                        id="inlineFormCustomSelect"
                                        ///value={this.state.time}
                                        onChange={this.salvaAlteracao.bind(this, 'tipo')}
                                        required
                                                >
                                                <option value="">selecione</option>
                                                <option  value={1}>Product Owner</option>   
                                                <option  value={2}>Scrum Master</option> 
                                                <option  value={3}>Membro Scrum Team</option> 
                                        </select>
                                        </div>
                                    </div>

                                    <div className="form-control input-lg">
                                        <label className="col-form-label" htmlFor="senha">Senha</label>
                                        
                                        <input id="senha" 
                                                className="form-control input-lg" 
                                                type="password" 
                                                placeholder="senha" 
                                                required="true"
                                                value={this.state.senha}
                                                onChange={this.salvaAlteracao.bind(this, 'senha')}
                                        />
                                        
                                    </div>
                                    <div className="form-control input-lg">
                                        <label className="col-form-label" htmlFor="rsenha">Repita a senha</label>
                                        <input id="rsenha" 
                                                className="form-control" 
                                                type="password"  
                                                placeholder="Repita a senha" 
                                                required="true"
                                            
                                        />
                                    </div>
                                    <div className="form-group row">
                                            <button type="submit" 
                                            
                                            className={`btn btn-success btn-fill btn-block btn-lg ${this.state.status ==='enviando' ?'disabled': ''}`}>
                                            Cadastrar
                                        </button>                       
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
            
            );
    }
}