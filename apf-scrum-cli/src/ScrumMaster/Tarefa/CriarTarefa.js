import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default  class CriarTarefa extends Component{
    state = {
        open: false,msg:''
      };
    
      handleOpen = () => {          
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };
      handleAtualizarTarefa = () => {
        
        //this.handleClose; 
      };

      handleCancelar = () => {
        this.setState({open: false});
        
      };
    
    render(){
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
      
         return(
            <div>
                <RaisedButton label="Criar Tarefa" onClick={this.handleOpen} />
            <Dialog
              title={this.props.nomeTarefa}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
            

            </Dialog>
            
            </div>
        );
    }
}