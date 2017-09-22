import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import Snackbar from 'material-ui/Snackbar';

export default  class Acao extends Component{
    constructor(props) {
        super(props);
        this.state = { open: false,  msg:''};
    }


    alterarStatusTarefa =() => {
        const requestInfo = {
            method:'POST',
            headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
        };
//
        fetch("http://scrum-php.herokuapp.com/v1/scrumteam/tarefa/"+this.props.label+"/"+parseInt(this.props.IDTarefa,10),requestInfo)            
        .then(response =>{
        if(response.status === 200 || response.status === 201 ){
            this.setState({msg:"Ação de "+this.props.label+" realizada com sucesso", cod:response.status});
            PubSub.publish("TarefaStatus");      
            return response;
        }
        if(response.status === 400)
          this.setState({msg:"Verefique os campos.", cod:response.status});
        if(response.status === 401)
            if(this.props.label === 'desistir' || this.props.label === 'concluir')
                this.setState({msg:'Tarefa pertence a outro membro do time', open:true})
            else
                this.props.history.push('/');
        }); 
    }
    render(){
         return(
            <div><RaisedButton label={this.props.label} onClick={this.alterarStatusTarefa}/>
            <Snackbar
                open={this.state.open}
                message={this.state.msg}
                autoHideDuration={3000}
                //onRequestClose={this.handleRequestClose}
            />
            </div>
        );
    }
}