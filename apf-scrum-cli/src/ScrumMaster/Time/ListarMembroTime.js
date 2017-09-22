import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import PubSub from 'pubsub-js';
import Subheader from 'material-ui/Subheader';
import Progess from '../../Componentes/Progress';

export default  class  extends Component{
    constructor(props) {
        super(props);
        this.state = {lista : [], status: '', cod:'' };
        this.removerMembro = this.removerMembro.bind(this);    
      }
    
      componentWillMount(){
        this.preencheLista();
    
        PubSub.subscribe('atualizaListaMembro', function(topico){
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
    
            fetch("http://scrum-php.herokuapp.com/v1/scrummaster/time/membro/"+parseInt(this.props.idTime, 10), requestInfo)
            .then(response =>{
                if(response.status === 200 || response.status === 201){
                    this.setState({status:'', cod:response.status})
                    return response.json();
                }else
                    this.setState({status:'', cod:response.status})
            })
            .then(membros =>{
                if(membros)
                    this.setState({lista:membros});        
            });
        }
        
        removerMembro = (data, e) =>{   
            this.setState({status:'enviando'})
            const requestInfo = {
                method:'DELETE',
                headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
            };
            
            fetch("http://scrum-php.herokuapp.com/v1/scrummaster/time/membro/"+parseInt(data.idMembro, 10),requestInfo)            
            .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                this.setState({status:'', cod:response.status})  
                return response;
            }else
                this.setState({status:'', cod:response.status})
            });
        };
       
    render(){
        if(!this.state.lista){
            return(<span>Não existem membros para estes times</span>)
        }
         return(
            <div>
                <MuiThemeProvider>
                    <List>
                    <Subheader>Membros do Scrum Team</Subheader>
                    <Progess status={this.state.status} tipo='circular'/>
                     { this.state.lista.map(function(membro){
                         return ( 
                            <ListItem 
                                    key={membro.idMembro} 
                                    primaryText={membro.email} 
                                    rightIcon={<ActionDelete/>}
                                    name={membro.email}
                                    onClick={this.removerMembro.bind(this, membro)}
                                    value={membro.IDDesenvolvedor} 
                            />
                                 )
                        }, this)
                    } 
                    </List>
                </MuiThemeProvider>
            </div>
        );
    }
}