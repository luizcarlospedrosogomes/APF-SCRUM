import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
    customWidth: {
      width: 150,
    },
  };

export default  class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {msg:''
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
        console.log(this.state.tipo)
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
                this.setState({msg:"Cadastro concluido com sucesso", cod:response.status});
                return response.text();
            }
            if(response.status === 400){
              this.setState({msg:"Verefique os campos.", cod:response.status});
              throw new Error('Verifique os campos');
            }
            else{
                this.setState({msg:"Entre em contato com o administrador.", cod:response.status});
                throw new Error('erro: '+ response.status+' nao foi possivel criar seu cadastro');
            }
        }).catch(error => {
            this.setState({msg:error.message});
        });
        
    }
    
    
      render(){
         return(
            <div>
                    <div className="card">                            
                         <h4 className="card-header bg-success">Cadastro</h4>                          
                            
                            <div className="card-block">
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
                                            className=" btn-fill btn-block btn btn-success btn-lg">
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