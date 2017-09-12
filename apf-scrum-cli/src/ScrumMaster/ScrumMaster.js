import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';    
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MenuSuperior from './MenuSuperior';
import MenuEsquerdo from './MenuEsquerdo';
import AdicionarTime from './AdicionarTime';
import BuscarTime from './BuscarTime';
export default  class ScrumMaster extends Component{
    constructor(props) {
        super(props);
        this.state = {lista : [], msg: '' };    
      }
    
      componentWillMount(){
        this.preencheLista();
    
        PubSub.subscribe('atualizaListaTime', function(topico){
            this.preencheLista();
          }.bind(this)); 
        PubSub.subscribe('removerTimeProjeto', function(topico){
            this.preencheLista();
        }.bind(this)); 
        
        PubSub.subscribe('associarTime', function(topico){
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
            fetch("http://scrum-php.herokuapp.com/v1/scrummaster/projeto", requestInfo)
            .then(response =>{
                if(response.status === 200 || response.status === 201){
                    console.log("RESPOSTA DO SERVIDOR, 200, AUTOTIZADO");
                    return response.json();
                  }if(response.status === 401){
                    console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
                    //this.props.history.push('/logout/representante');
                  }
            })
            .then(projetos =>{
                this.setState({lista:projetos});        
                console.log("DADOS RECEBIDOS:" +projetos);
              });
        }

    render(){
         return(
            <div>
                 <MenuSuperior tipoUsuario="Scrum Master"/>
             <div className="container-fluid">       
                    <MenuEsquerdo titulo="Projetos"/>
                <main className="col-sm-10 ml-sm-auto col-md-10 pt-3" role="main">
                <div className="row">
                { this.state.lista.map(function(projeto){
                         return (
                            
                            <div className="col-md-4">             
                                <MuiThemeProvider>
                                    <Card>
                                         <CardHeader
                                            style={{backgroundColor: '#95a5a6', color: 'white'}}
                                            title={<h3>{projeto.nome}</h3>}
                                            actAsExpander={false}
                                            showExpandableButton={false}
                                            />
                              
                                        <CardText expandable={false}> 
                                        <div className="row">                                       
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6" >                            
                                                <div className="card" >                      
                                                    <div className="card-block" >
                                                    <div className="content h1" >100%</div>
                                                    </div>
                                                    <div className="card-footer text-center small bg-danger text-white">CONCLUIDO</div>             
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6" >                            
                                                <div className="card" >                      
                                                    <div className="card-block" >
                                                    <div className="content h1" >100%</div>
                                                    </div>
                                                    <div className="card-footer text-center small bg-danger text-white">CONCLUIDO</div>             
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6" >                            
                                                <div className="card" >      
                                                    <div className="card-footer text-center bg-info text-white">Backlog</div>             
                                                       
                                                </div>
                                            </div> 
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6" >                            
                                                <div className="card" >                      
                                                    <div className="card-footer text-center">Adicionar Sprint</div>             
                                                </div>
                                            </div>   
                                        </div>
                                        </CardText>
                                        <CardActions>
                                        <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">    
                                                    {projeto.timeProjeto  == null ? 
                                                            <AdicionarTime/> 
                                                            : <BuscarTime 
                                                                idTime={projeto.timeProjeto}
                                                                idProjeto={projeto.idProjeto}
                                                                />
                                                    }
                                                   
                                                </div>
                                            </div>
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