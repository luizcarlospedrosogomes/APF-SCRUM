import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Checkbox from 'material-ui/Checkbox';
import PubSub from 'pubsub-js';


export default  class AdicionarSprint extends Component{
    constructor() {
        super();    
        this.state = {
            open: false,msg:'', checked: false, itensBacklog:[], itensSelecionados: [],
          };
       }

    getBacklog(){
        this.setState({msg:"Carrengando itens do backlog"}); 
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers: new Headers({'X-token': localStorage.getItem('token')})
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/projeto/backlog/"+parseInt(this.props.idProjeto, 10),requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201 ){ 
                this.setState({msg:""}); 
                return response.json();
            }
        })
        .then(itens =>{
            if(itens && itens.length)
               this.setState({itensBacklog:itens});        
            
          });         
    }

    onChange(evento) {
        const options = this.state.itensSelecionados
        let index
        if (evento.target.checked) {
          options.push(+evento.target.value)
        } else {
          index = options.indexOf(+evento.target.value)
          options.splice(index, 1)
        }
        this.setState({ itensSelecionados: options })
      }
    
      handleOpen = () => {  
        this.setState({open: true});
        this.getBacklog(); 
      };
    
      handleClose = () => {
        this.setState({open: false});
      };

      handleCriarSprint(event){
        if(this.state.itensSelecionados.length<1)
            return this.setState({msg:'Selecione 01 item para o sprint.'})
        const requestInfo = {
            method:'POST',
            dataType: 'json',
            body: JSON.stringify({itensSelecionados:this.state.itensSelecionados}),
            headers: new Headers({'X-token': localStorage.getItem('token')})
        };
        console.log(this.state.itensSelecionados)
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/sprint/"+parseInt(this.props.idProjeto, 10),requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                this.setState({msg:"Sprint criado com sucesso", cod:response.status}); 
                return response.json();
            }
            if(response.status === 400 || response.status === 401 ){
                this.setState({msg:"Verefique os dados", cod:response.status});   
                return;
            }
        })
        .then(sprint =>{
            PubSub.publish("AdicionarSprint", sprint.id);
            this.setState({open: false});  
        });
       }
       
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
              label="Confirmar Seleção e Criar Sprint"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleCriarSprint.bind(this)}
            />,
          ];
        if(!this.state.itensBacklog && !this.state.itensBacklog.length){
            return (<h5>Não existe backlog para este projeto</h5>)
        }
         return(
            <div className="col-12 col-md-10 col-lg-10">
                <RaisedButton label="ADDSprint" onClick={this.handleOpen} />
            <Dialog
              title={"Backlog do projeto: "+this.props.nomeProjeto}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
           
            <span>{this.state.msg}</span>
            <table className="table table-hover table-responsive">
                <thead>
                    <tr>
                    <th>Selecionar</th>
                    <th>Prioridade</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                { this.state.itensBacklog && this.state.itensBacklog.length ?
                this.state.itensBacklog.map(function(item){
                     return (                            
                        <tr key={item.IDTarefa}>
                            <th scope="row">
                                <Checkbox
                                key={item.IDTarefa}
                                value={item.IDTarefa}
                                onCheck={this.onChange.bind(this)}
                            />
                            </th>
                            <td>{
                                item.prioridade === 1 ? "Alta" : "" 
                             || item.prioridade === 2 ? "Media" : ""
                             || item.prioridade === 3 ? "Baixa" : ""  }
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                        </tr>
                       )
                    }, this)
                    :<h3>Carregando...</h3>}
                </tbody>
                </table>
            </Dialog>
            </div>
        );
    }
}