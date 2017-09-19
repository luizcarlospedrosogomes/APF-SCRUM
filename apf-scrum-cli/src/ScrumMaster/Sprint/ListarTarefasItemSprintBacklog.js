import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import PubSub from 'pubsub-js';

export default  class ListarTarefasItemSprintBacklog extends Component{
    constructor(props) {
        super(props);
        this.state = { expanded: false, tarefas:[]};
    }

    componentWillMount(){
       this.getItensSprintBacklog();
       PubSub.subscribe('atualizaListaTarefa', function(topico){
        this.getItensSprintBacklog();
      }.bind(this)); 
    }
    getItensSprintBacklog(){
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'X-token': localStorage.getItem('token')}
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/sprint/item/"+parseInt(this.props.IDSprintBacklog,10), requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
                console.log("RESPOSTA DO SERVIDOR, 200, AUTOTIZADO");
                return response.json();
              }if(response.status === 401){
                console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
                //this.props.history.push('/logout/representante');
              }
        })
        .then(ItensSprintBacklogTarefa =>{
            this.setState({tarefas:ItensSprintBacklogTarefa});        
          });
    }
    render(){
         return(
            <div>
                  <div className="col-12 col-md-12 col-lg-12"> 
                                { this.state.tarefas && this.state.tarefas.length ?
                               this.state.tarefas.map(function(tarefa){
                                    return (
                                   <div className="card" key={tarefa.IDTarefa}>
                                        <div className="card-block">
                                                <div className="row" key={tarefa.IDTarefa}>
                                                <div className="col-6 col-md-1 col-lg-1">  
                                                    {tarefa.nomeTarefa}
                                                </div>
                                                <div className="col-6 col-md-3 col-lg-3" >  
                                                    {tarefa.descricao}
                                                </div>
                                                <div className="col-6 col-md-3 col-lg-3" >  
                                                    Data de Inicio: 
                                                </div>
                                                <div className="col-6 col-md-3 col-lg-3">  
                                                    Estimar
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                }):<h3>NÃO EXISTE TAREFAS PARA ESTE ITEM</h3>}
                                    
                                </div>
              </div>
        );
    }
}