import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import PubSub from 'pubsub-js';
import Subheader from 'material-ui/Subheader';

export default  class  extends Component{
    constructor(props) {
        super(props);
        this.state = {lista : [], msg: '' };
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
    
            const requestInfo = {
                method:'GET',
                dataType: 'json',
                headers:{'X-token': localStorage.getItem('token')}
            };
    
            fetch("http://scrum-php.herokuapp.com/v1/scrummaster/time/membro/"+parseInt(this.props.idTime, 10), requestInfo)
            .then(response =>{
                if(response.status === 200 || response.status === 201)
                    return response.json();
                if(response.status === 401)
                     this.props.history.push('/');
            })
            .then(membros =>{
                this.setState({lista:membros});        
            });
        }
        
        removerMembro = (data, e) =>{   
            console.log(data.idMembro);
            const requestInfo = {
                method:'DELETE',
                headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
            };
            
            fetch("http://scrum-php.herokuapp.com/v1/scrummaster/time/membro/"+parseInt(data.idMembro, 10),requestInfo)            
            .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                this.preencheLista();
                this.setState({msg:"membro removido com sucesso"});  
                return response;
            }
            if(response.status === 400 || response.status === 404)
              this.setState({msg:"nao encontrado."});
            if(response.status === 401)
                this.props.history.push('/');
              
            });
        };
       
    render(){
         return(
            <div>
                <MuiThemeProvider>
                    <List>
                    <Subheader>Membros do Scrum Team</Subheader>
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