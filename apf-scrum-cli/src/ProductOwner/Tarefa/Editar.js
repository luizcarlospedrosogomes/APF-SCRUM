import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';

import FormTarefa from './FormTarefa';

export default  class Editar extends Component{
    state = {
        open: false,msg:''
      };
      componentWillMount(){
        PubSub.subscribe('tarefaAtualizada', function(topico, status){
          if(status ===201){
            this.setState({open: false});
          }else{
            this.setState({msg:"Verfique os campos"});
          }
        }.bind(this)); 
    }
    componentDidMount(){
        PubSub.unsubscribe(this.tarefaAtualizada);
       // PubSub.unsubscribe(this.excluir);
    }
      handleOpen = () => {          
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };
      handleAtualizarTarefa = () => {
        PubSub.publish("atualizarTarefa"); 
        //this.handleClose; 
      };

      handleCancelar = () => {
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
            label="Atualizar"
            primary={true}
            keyboardFocused={true}
            onClick={this.handleAtualizarTarefa}
          />,
        ];
    
    
        return (
          <div>
            <RaisedButton label="Editar" onClick={this.handleOpen} />
            <Dialog
              title={this.props.nomeTarefa}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
            <FormTarefa idTarefa={this.props.idTarefa}/>

            </Dialog>
            
          </div>
        );
      }
    }