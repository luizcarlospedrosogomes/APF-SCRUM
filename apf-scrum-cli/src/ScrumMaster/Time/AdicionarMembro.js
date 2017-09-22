import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';

import Progess from '../../Componentes/Progress';
import Mensagens from '../../Componentes/Mensagens';

export default  class AdicionarMembro extends Component{
    
    constructor(props) {
      super(props);
      this.state = { open: false, cod:'', status:'', email:'' };
    }     
    salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
    }

      handleOpen = () => {          
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };
      
      handlAdicionarMembro = (evento) => {
        if(this.state.email ===''){
            this.setState({msg:'Email obrigatorio'})
            return
        }
        this.setState({status:'enviando'})
        evento.preventDefault();
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({ email:this.state.email
                              , id_time : parseInt(this.props.idTime,10)}),
            headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/time/membro",requestInfo)            
        .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                this.setState({status:'', cod:response.status, open: false});
//                PubSub.publish("atualizaListaMembro");      
                return response;
            }else
              this.setState({status:'', cod:response.status});
        })
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
                label="Adicionar Membro ao Scrum Team"
                primary={true}
                keyboardFocused={true}
                onClick={this.handlAdicionarMembro}
              />,
            ];
   
            return (
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <RaisedButton  label="Adicionar Membro" onClick={this.handleOpen} primary={true}/>
                <Dialog
                  title={this.props.nomeTime}
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  autoScrollBodyContent={true}
                >
                <span><Mensagens cod={this.state.cod}/></span>
                <Progess status={this.state.status}/>
                <form className="form-inline col-12 col-md-6">
                <label className="mr-sm-2" htmlFor="email">Email</label>
                <input 
                    type="email" 
                    placeholder="desenvolvedor@dev.com" 
                    id="email" 
                    className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg"
                    value={this.state.email}
                    onChange={this.salvaAlteracao.bind(this, 'email')}
                    required
                />
              </form>
                </Dialog>
                
              </div>
        );
    }
}
