import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MenuSuperior from '../MenuSuperior';
import MenuEsquerdo from '../MenuEsquerdo';
import CriarTime from './CriarTime';
import MembroTime from './ListarMembroTime';
import AdicionarMembro from './AdicionarMembro';
import Progess from '../../Componentes/Progress';

export default  class Time extends Component{

    constructor(props) {
        super(props);
        this.state = {lista : [], status: '', cod:'' };    
      }
    
      componentWillMount(){
        this.preencheLista();
        PubSub.subscribe('atualizaListaTime', function(topico){
            this.preencheLista();
          }.bind(this)); 
    
        if (localStorage.getItem("token") === null) {
          this.props.history.push('/');
        }
      }
      preencheLista(){ 
            this.setState({status:'enviando'})
            const requestInfo = {
                method:'GET',
                dataType: 'json',
                headers:{'X-token': localStorage.getItem('token')}
            };
    
            fetch("http://scrum-php.herokuapp.com/v1/scrummaster/time", requestInfo)
            .then(response =>{
                if(response.status === 200 || response.status === 201){
                    this.setState({status:'', cod:response.status})
                    return response.json();
                }else
                this.setState({status:'', cod:response.status})
            })
            .then(times =>{
                if(times)
                     this.setState({lista:times});        
                
              });
        }
    
    render(){
         return(
            <div>
                 <MenuSuperior tipoUsuario="Scrum Master"/>
             <div className="container-fluid">       
                    <MenuEsquerdo titulo="Projetos"/>
                <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main" key="sjsjsj">
                    <CriarTime/>
                    <br/>
                    <div className="row">
                    <br/>
                    <Progess status={this.state.status} tipo='circular'/>
                    { this.state.lista.map(function(time){
                         return ( 
                            <div key={time.id} className="col-md-4">             
                                <MuiThemeProvider>
                                    <Card>
                                       
                                            <CardHeader
                                            style={{backgroundColor: '#1abc9c', color: 'white'}}
                                            title={<h3>{time.nome}</h3>}
                                            actAsExpander={false}
                                            showExpandableButton={false}
                                            />
                              
                                        <CardText expandable={false}>                                        
                                            <MembroTime idTime={time.id}/>
                                        </CardText>
                                        <CardActions>
                                            <AdicionarMembro nomeTime={time.nome} idTime={time.id}/>
                                        </CardActions>
                                    </Card>                                    
                                </MuiThemeProvider>
                            </div>
                                )
                            })
                        }                  
                    </div>
                </main>
               </div>  
            </div>
        );
    }
}