import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';

export default  class ExcluirTarefa extends Component{
    
    constructor(props) {
        super(props);
        this.state = {msg:'',open: false}
    }
      handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        const requestInfo = {
            method:'DELETE',
            headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
        };
        fetch("http://scrum-php.herokuapp.com/v1/tarefa/"+parseInt(this.props.idTarefa, 10),requestInfo)            
        .then(response =>{
        if(response.status === 200 || response.status === 201 ){
            PubSub.publish("removerTarefa");
            this.setState({msg:"Projeto criado com sucesso"});  
            return response;
        }
        if(response.status === 400 || response.status === 404){
          this.setState({msg:"Verefique os campos."});
        }
        if(response.status === 401){
            this.props.history.push('/');
          }
    });
        this.setState({open: false});
      };
      
      handleCancelar = () =>{
        this.setState({open: false});
      };

      render() {
        const actions = [
          <FlatButton
            label="Cancelar"
            primary={true}
            onClick={this.handleCancelar}
          />,
          <FlatButton
            label="Arquivar"
            primary={true}
            onClick={this.handleClose}
          />,
        ];
    
        return (
          <div>
            
            <RaisedButton label="Arquivar" onClick={this.handleOpen} />
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <p>{this.state.msg}</p>
              <h4>Arquivar tarefa: {this.props.nomeTarefa} [id: {this.props.idTarefa}]?</h4>
            </Dialog>
            
          </div>
        );
      }
}