import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import PubSub from 'pubsub-js';
import {Link} from 'react-router-dom';

import Pontos from '../../Componentes/Pontos';

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
        if(response.status === 200 || response.status === 201)
            return response.json();
        if(response.status === 401)
            this.props.history.push('/  ');
        if(response.status === 404)
             this.setState({msg:"não existem tarefas para este item"}) 
        })
        .then(ItensSprintBacklogTarefa =>{
                if(ItensSprintBacklogTarefa)
                    this.setState({tarefas:ItensSprintBacklogTarefa});        
          });
    }
    render(){
            if(!this.state.tarefas){
                return(<h5>Não existem tarefas para este item</h5>);
            }
            return(
                <div>
                  <div className="col-12 col-md-12 col-lg-12"> 
                                { this.state.tarefas.map(function(tarefa){
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
                                                    <Link to={"/scrummaster/contagem/"+tarefa.IDTarefa}>Estimativas</Link>
                                                </div>
                                                <div className="col-6 col-md-2 col-lg-2">  
                                                   Pontos: <Pontos IDTarefa={tarefa.IDTarefa}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                         }             
                </div>
              </div>
            );  
    }
}