import React, { Component } from 'react';

import PubSub from 'pubsub-js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router-dom';

const User = ({ match }) => {
    return <h1>Hello {this.match.params}!</h1>
  }
export default  class CriarTarefa extends Component{
   
    
    constructor(props) {
        super(props);
        this.state = {msg:''
                    , nome:''
                    , prioridade:1
                    , descricao:''
                    
                }
                
    }
    componentDidMount() {
        
        
        
        
        }
        
    salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
    }
    
    enviaForm(evento){
        evento.preventDefault();
        console.log(this.props);
        
         const requestInfo = {
            method:'POST',
            body:JSON.stringify({ nome:this.state.nome
                                , descricao: this.state.descricao
                             //   , id_projeto: this.props.match.params.idprojeto
                                , prioridade: this.state.prioridade
                            }),
            headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
        };
        
       /* fetch("http://scrum-php.herokuapp.com/v1/tarefa",requestInfo)            
        .then(response =>{
        if(response.status === 200 || response.status === 201 ){
            this.setState({msg:"Tarefa criada com sucesso", cod:response.status});
            PubSub.publish("atualizaListaTarefa");      
            return response;
        }
        if(response.status === 400){
          this.setState({msg:"Verefique os campos.", cod:response.status});
          throw new Error('Verifique os campos');
        }
        if(response.status === 401){
            console.log("401")
            this.props.history.push('/');
          }
        else{
            this.setState({msg:"Entre em contato com o administrador.", cod:response.status});
            throw new Error('erro: '+ response.status+' nao foi possivel criar seu cadastro');
        }
        }).catch(error => {
            this.setState({msg:error.message});
        });
        */
    }
    render(){
         return(
             
            <div>
                <User/>
                <h1>projeto: {this.props.match}</h1>
                <form className="form-inline" onSubmit={this.enviaForm.bind(this)}>
                <div className="input-group input-group-lg">
                    <input 
                        type="text" 
                        placeholder="Nome da tarefa" 
                        id="nome" 
                        className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg"
                        value={this.state.nome}
                        onChange={this.salvaAlteracao.bind(this, 'nome')}
                        required
                    />
                    <MuiThemeProvider>
                    <SelectField
                    value={this.state.prioridade}
                    onChange={this.handleChange}
                    autoWidth={true}
                    floatingLabelText="Prioridade"
                    >
                    <MenuItem value={1} primaryText="Alta"/>
                    <MenuItem value={2} primaryText="Media"/>
                    <MenuItem value={3} primaryText="Baixa"/>
                    </SelectField>
                    
                    </MuiThemeProvider>
                    <textarea 
                        className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg"
                        id="exampleTextarea" 
                        placeholder="Descrição"
                        rows="1"
                        value={this.state.descricao}
                        onChange={this.salvaAlteracao.bind(this, 'descricao')}
                        required
                    >
                    </textarea>
                        
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary btn-lg "
                    
                >
                    Criar Tarefa
                </button>
              </form>
              <p></p>
            </div>
        );
    }
}