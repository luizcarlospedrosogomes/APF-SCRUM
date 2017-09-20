import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';

export default  class CriarTarefa extends Component{
  
    constructor(props) {
        super(props);
        this.state = { expanded: false, tarefas:[], open: false,msg:'', nome:'', descricao:'', dataEntrega:''};
    }
    componentWillMount(){
      
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
    
    handleCriarTarefa = () => {    
      this.criarTarefa();
    };

    handleCancelar = () => {
        this.setState({open: false});    
    };

    criarTarefa(){
      
      if(this.state.nome == '' || this.state.descricao =='')
        return this.setState({msg:"Nome tarefa e Descriçao tarefa são obrigadorios"});
      console.log(localStorage.getItem('token'))
      const requestInfo = {
          method:'POST',
          body:JSON.stringify({ nome:this.state.nome, descricao:this.state.descricao, dataEntrega:this.state.dataEntrega }),
          headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
      };

      fetch("http://scrum-php.herokuapp.com/v1/scrummaster/tarefa/"+parseInt(this.props.IDSprintBacklog,10),requestInfo)            
      .then(response =>{
      if(response.status === 200 || response.status === 201 ){
          this.setState({msg:"Tarefa criada com sucesso", cod:response.status});
          this.setState({open: false});         
          return response.json();
      }
      if(response.status === 400)
        this.setState({msg:"Verefique os campos.", cod:response.status});
      if(response.status === 401)
          this.props.history.push('/');
      })
      .then(tarefa =>{
        console.log(tarefa)
        PubSub.publish("atualizaListaTarefa", tarefa.id);
        this.setState({open: false});  
    });
    }

    render(){
        const actions = [
            <FlatButton
              label="Cancelar"
              primary={true}
              onClick={this.handleCancelar}
            />,
            <FlatButton
              label="Criar tarefa e realizar contagem"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleCriarTarefa}
            />,
          ];
      
         return(
            <div>
                <RaisedButton label="Criar Tarefa" onClick={this.handleOpen} />
            <Dialog
              title="Adicionar Tarefa"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
            <div className="row">
              <span className="badge badge-danger">{this.state.msg}</span>
              <form>
                <div className="form-group row">
                  <label  htmlFor="example-text-input" 
                        className="col-2 col-md-2 col-lg-2 col-form-label"
                  >
                      Nome Tarefa
                  </label>
                  <div className="col-4 col-md-4 col-lg-4">
                    <input className="form-control" 
                            type="text" 
                            placeholder="Nome tarefa" 
                            id="example-text-input"
                            value={this.state.nome}
                            onChange={this.salvaAlteracao.bind(this, 'nome')}
                    />
                  </div>
                  <label  htmlFor="example-text-input" 
                          className="col-2 col-md-2 col-lg-2 col-form-label"
                  >
                        Data entrega
                  </label>
                  <div className="col-4 col-md-4 col-lg-4">
                    <input className="form-control" 
                          type="text" 
                          placeholder="Data entrega" 
                          id="example-text-input"
                          value={this.state.dataEntrega}
                          onChange={this.salvaAlteracao.bind(this, 'dataEntrega')}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label  htmlFor="example-text-input" 
                        className="col-2 col-md-2 col-lg-2 col-form-label"
                  >
                      Descrição Tarefa
                  </label>
                  <div className="col-10 col-md-10 col-lg-10">
                    <textarea rows="4" cols="50" className="form-control" 
                            type="text" 
                            placeholder="Descrição tarefa" 
                            id="example-text-input"
                            value={this.state.descricao}
                            onChange={this.salvaAlteracao.bind(this, 'descricao')}
                    >
                    </textarea>
                  </div>
                  
                </div>
              </form>
            
            </div>

            </Dialog>
            
            </div>
        );
    }
}