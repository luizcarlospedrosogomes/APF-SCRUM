import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PubSub from 'pubsub-js';
import ActionDelete from 'material-ui/svg-icons/action/delete';
export default  class RemoverContagem extends Component{
  
    constructor(props) {
        super(props);
        this.state = { expanded: false,  open: false,msg:''};
    }
    componentWillMount(){
      
    }
 
    handleOpen = () => {          
        this.setState({open: true});
    };
    
    handleClose = () => {
        this.setState({open: false});
    };
    
    handleRemoverContagem = () => {    
      this.removerContagem();
    };

    handleCancelar = () => {
        this.setState({open: false});    
    };

    removerContagem(){

      const requestInfo = {
          method:'DELETE',
          body:JSON.stringify({ nome:this.state.nome, descricao:this.state.descricao, dataEntrega:this.state.dataEntrega }),
          headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
      };

      fetch("http://scrum-php.herokuapp.com/v1/scrummaster/contagem/"+this.props.tipoContagem+"/"+parseInt(this.props.IDContagem,10),requestInfo)            
      .then(response =>{
          if(response.status === 200 || response.status === 201 ){
              this.setState({msg:"Contagem removida com sucesso", cod:response.status, open: false});  
              PubSub.publish("removerContagem");         
              return response;
          }
          if(response.status === 400)
            this.setState({msg:"Verefique os campos.", cod:response.status});
          if(response.status === 401)
              this.props.history.push('/');
            
          })
    }

    render(){
        const actions = [
            <FlatButton
              label="Cancelar"
              primary={true}
              onClick={this.handleCancelar}
            />,
            <FlatButton
              label="Remover"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleRemoverContagem}
            />,
          ];
      
         return(
            <div>
                <ActionDelete onClick={this.handleOpen} />
            <Dialog
              title="Remover contagem"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
            <h6>{this.props.tipoContagem}</h6>
            <p>
              Pontos: {this.props.ponto} - Tipo dado: {this.props.TDContagem} -
              Tipo registro: {this.props.TRContagem} - Complexidade:  {this.props.Complexidade}
            </p>
            </Dialog>
            
            </div>
        );
    }
}