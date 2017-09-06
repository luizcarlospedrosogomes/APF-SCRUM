import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FormTarefa from './FormTarefa';

export default  class Editar extends Component{
    state = {
        open: false,
      };
    
      handleOpen = () => {
          
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
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
            onClick={this.handleClose}
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
            <FormTarefa/>
            </Dialog>
            
          </div>
        );
      }
    }