import React, { Component } from 'react';
import {Card, CardActions, CardHeader,  CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PubSub from 'pubsub-js';

import MenuSuperior from '../MenuSuperior';
import MenuEsquerdo from '../MenuEsquerdo';
import ListarTarefasItemSprintBacklog from './ListarTarefasItemSprintBacklog';
import CriarTarefa from '../Tarefa/CriarTarefa';
import Pontos from '../../Componentes/Pontos';
export default  class SprintBacklog extends Component{
    constructor(props) {
        super(props);
        this.state = { expanded: false, ItensSprintBacklog:[]};
      }
    componentWillMount(){
        PubSub.subscribe('atualizarListaSPrintBacklog', function(topico, tarefa){
            this.props.history.push('/scrummaster/contagem/'+tarefa);
        }.bind(this)); 
        this.getItensSprintBacklog();
    } 

    getItensSprintBacklog(){
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'X-token': localStorage.getItem('token')}
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/sprint/backlog/"+parseInt(this.props.match.params.IDSprint,10), requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
                return response.json();
              }if(response.status === 401){
                console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
                //this.props.history.push('/logout/representante');
              }
        })
        .then(ItensSprintBacklog =>{
            this.setState({ItensSprintBacklog:ItensSprintBacklog});        
          });
    }
    expandir(value) {
        PubSub.publish('getTarefasItemBacklog', value);
        this.setState({expanded: true});
      }
    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
      };
 
      handleExpand = (value) => {
        
        this.setState({expanded: true});
      };
      handleReduce = () => {
        this.setState({expanded: false});
      };

    render(){
         return(
            <div>
                
                <MenuSuperior tipoUsuario="Scrum Master" titulo="Sprint Backlog"/>
                <div className="container-fluid">    
                        <MenuEsquerdo titulo="Sprint Backlog"/>
                    <main className="col-sm-10 ml-sm-auto col-md-10 pt-3" role="main">
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-12">
                                    
                            {
                             this.state.ItensSprintBacklog.map(function(itens, index){
                                return ( 
                                    
                                    <MuiThemeProvider key={index}>
                                         
                                        <Card  key={index} 
                                                expanded={this.state.expanded} 
                                                onExpandChange={this.handleExpandChange.bind(this)}
                                                style={{margin:'10px'}}        
                                        >
                                                
                                            <CardHeader
                                        
                                            title={<h2 style={{color: 'white'}}>{itens.nomeItemBacklog}</h2>}
                                            subtitle={itens.descricao}
                                            style={{backgroundColor: '#1abc9c', color: 'white'}}
                                            
                                            />
                                                                                        
                                            <CardText 
                                                key={index} 
                                                 expandable={false}
                                            >
                                            <div className="collapse" id={"collapseExample"+itens.IDSprintBacklog}>
                                                    <ListarTarefasItemSprintBacklog IDSprintBacklog={itens.IDSprintBacklog}/>  
                                            </div>
                                                
                                            </CardText>
                                            <CardActions
                                                style={{backgroundColor: '#ecf0f1', color: 'white', fontColor:'white'}}
                                             >
                                                <div className="row">
                                                    <FlatButton 
                                                    label="Mostrar/Esconder Tarefas" 
                                                    href={"#collapseExample"+itens.IDSprintBacklog} 
                                                    aria-expanded="false" 
                                                    aria-controls="collapseExample"
                                                    data-toggle="collapse"
                                                    onClick={()=>{this.expandir(itens.IDSprintBacklog)}}
                                                    key={itens.IDSprintBacklog+201}
                                                    value={itens.IDSprintBacklog}
                                                    // onClick={this.expandir.bind(this)}
                                                    />
                                                    
                                                    <div className="col">
                                                        <div className="float-right">
                                                            <CriarTarefa IDSprintBacklog={itens.IDSprintBacklog}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardActions>
                                        </Card>
                                        </MuiThemeProvider>
                                        
                                        )
                                    }, this)
                            }                                    
                                </div>
                            </div>
                    </main>
                </div>
            </div>
        );
    }
}