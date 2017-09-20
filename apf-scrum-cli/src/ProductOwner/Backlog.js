import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import MenuSuperior from './MenuSuperior';
import MenuEsquerdo from './MenuEsquerdo';
import CriarTarefa from './Tarefa/CriarTarefa';
import ExcluirTarefa from './Tarefa/ExcluirTarefa';
import Editar from './Tarefa/Editar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default  class Backlog extends Component{
    constructor(props) {
        super(props);
        this.state = {lista : [], msg: '' };    
      }
    
      componentWillMount(){
        this.preencheLista();
    
        PubSub.subscribe('atualizaListaTarefa', function(topico){
            this.preencheLista();
          }.bind(this)); 
          
          PubSub.subscribe('removerTarefa', function(topico){
            this.preencheLista();
          }.bind(this)); 

          PubSub.subscribe('tarefaAtualizada', function(topico, response){
            this.preencheLista();
          }.bind(this));
    
        if (localStorage.getItem("token") === null) {
          this.props.history.push('/');
        }
      }

      preencheLista(){ 
    
            const requestInfo = {
                method:'GET',
                dataType: 'json',
                headers:{'X-token': localStorage.getItem('token')}
            };
    //
            fetch("http://scrum-php.herokuapp.com/v1/tarefa/projeto/"+parseInt(this.props.match.params.idProjeto,10), requestInfo)
            .then(response =>{
                if(response.status === 200 || response.status === 201){
                    console.log("RESPOSTA DO SERVIDOR, 200, AUTOTIZADO");
                    return response.json();
                  }if(response.status === 401){
                    console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
                    //this.props.history.push('/logout/representante');
                  }
            })
            .then(tarefas =>{      
                if(tarefas && tarefas.length >0)          
                   this.setState({lista:tarefas});        
              });
        }

    render(){
         return(
            <div>
                
                <MenuSuperior/>    
                <div className="container-fluid">       
                <MenuEsquerdo titulo="Backlog"/>
                    <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                        <div className="row">
                            <CriarTarefa idProjeto={this.props.match.params.idProjeto}/>
                        </div>
                        <div className="row">
                        
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th>Prioridade</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Contagem</th>
                                    <th>Entregue</th>
                                    <th>Editar</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>                            
                            <tbody>
                            {
                             this.state.lista.map(function(t){
                                return (
                                        <tr key={t.IDTarefa}>
                                            <td>{
                                                t.prioridade === 1 ? "Alta" : "" 
                                                || t.prioridade === 2 ? "Media" : ""
                                                || t.prioridade === 3 ? "Baixa" : ""  }</td>
                                            <td>{t.nome}</td>
                                            <td>{t.descricao}</td>
                                            <td>140</td>
                                            <td>NAO</td>
                                            <td>
                                            <MuiThemeProvider>
                                                    <Editar nomeTarefa={t.nome} idTarefa={t.IDTarefa}/>
                                                </MuiThemeProvider>
                                            </td>
                                            <td>
                                                <MuiThemeProvider>
                                                    <ExcluirTarefa nomeTarefa={t.nome} idTarefa={t.IDTarefa}/>
                                                </MuiThemeProvider>
                                            </td>
                                        </tr>  
                                        )})}                          
                            </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}