import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';

import Acao from './Acao';

export default  class Tarefa extends Component{
    constructor(props) {
        super(props);
        this.state = { open: false, tarefas:[],  status:'AFazer', msg:''};
        
    }

    componentWillMount(){
       this.getTarefas();
       var fazendo = PubSub.subscribe('Fazendo', function(topico){
         this.setState({status:'Fazendo'})
        }.bind(this));
        
        PubSub.subscribe('AFazer', function(topico){
        var fazer = this.setState({status:'AFazer'})
        }.bind(this)); 

        PubSub.subscribe('Feito', function(topico){
        var feito =  this.setState({status:'Feito'})
        }.bind(this)); 
        var status = PubSub.subscribe('TarefaStatus', function(topico){
            this.getTarefas();
        }.bind(this)); 
    }
    
    componentDidMount(){
       PubSub.unsubscribe(this.fazendo);
       PubSub.unsubscribe(this.fazer);
       PubSub.unsubscribe(this.feito);
       PubSub.unsubscribe(this.status);
    }

    getTarefas(){
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'X-token': localStorage.getItem('token')}
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrumteam/tarefa/time", requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201)
                return response.json();
              if(response.status === 401)
                   ''
        })
        .then(tarefas =>{
            if(tarefas && tarefas.length)
                this.setState({tarefas:tarefas});        
          });
    }  

    render(){
        function dadosTarefa(index, tarefa){
            return(
            <Paper zDepth={2} style={{marginBottom: '0.2cm'}} key={index}>
            <div className="row">
                <div className="col-2" key={index}>
                    {tarefa.nomeItemSprintBacklog}
                </div>
                <div className="col-2">
                    Sprint: {tarefa.NSprint}
                </div>
                <div className="col-2">
                    Projeto : {tarefa.nomeProjeto}
                </div>
                <div className="col-2">
                    Pontos {tarefa.IDTarefa}
                </div>
                <div className="col-2">
                    
                    {tarefa.statusConclusao === 0 || tarefa.statusConclusao === null ?
                            tarefa.statusTarefa === null  || tarefa.statusTarefa === 0?
                              <Acao label="assumir" IDTarefa={tarefa.IDTarefa}/>
                            : <Acao label="desistir" IDTarefa={tarefa.IDTarefa}/>
                        :''
                    }
                </div>
                <div className="col-2">
                {tarefa.statusTarefa === 1 && !tarefa.statusConclusao == 1?
                              <Acao label="concluir" IDTarefa={tarefa.IDTarefa}/>
                            : ''
                }
                </div>
            </div>
            <Divider />
        </Paper>
            )
        }
        var tarefa =
        this.state.tarefas.map(function(tarefa, index){
            if((tarefa.statusConclusao == 0 || tarefa.statusConclusao ==  null) && (tarefa.statusTarefa === null || tarefa.statusTarefa === 0) && this.state.status ==='AFazer')            
                return(<div key={index}> {dadosTarefa(index,tarefa)} </div> )
            if((tarefa.statusConclusao == 0 || tarefa.statusConclusao ==  null) && tarefa.statusTarefa === 1 && this.state.status ==='Fazendo')            
                return(<div key={index}> {dadosTarefa(index,tarefa)} </div>)
            if(tarefa.statusConclusao === 1 && this.state.status ==='Feito')            
                return(<div key={index}> {dadosTarefa(index,tarefa)} </div>)
        }.bind(this))

        if(Object.keys(this.state.tarefas).length ===0 ){
            return(<div></div>)
        }else{
            return(<div>{tarefa}</div>)
        }
    }
}