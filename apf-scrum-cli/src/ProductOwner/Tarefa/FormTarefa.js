import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PubSub from 'pubsub-js';

export default  class FormTarefa extends Component{
    constructor(props) {
        super(props);
        this.state = {msg:''
                    , nome:''
                    , prioridade:1
                    , descricao:''
        }       
    }
    handleChange = (event, index, prioridade) => this.setState({prioridade});  
    componentWillMount(){
        this.getTarefa();
        PubSub.subscribe('atualizarTarefa', function(topico){
            this.atualizar();
          }.bind(this)); 
    }
    salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
    }
    atualizar(evento){
       // evento.preventDefault();
        const requestInfo = {
           method:'PUT',
           body:JSON.stringify({ nome:this.state.nome
                               , descricao: this.state.descricao
                               , prioridade: this.state.prioridade
                           }),
           headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
       };
       fetch("http://scrum-php.herokuapp.com/v1/tarefa/"+parseInt(this.props.idTarefa, 10),requestInfo)            
       .then(response =>{
       if(response.status === 200 || response.status === 201 ){
           this.setState({msg:"Tarefa criada com sucesso", cod:response.status});
           PubSub.publish("tarefaAtualizada", response.status); 
           return response;
       }
       if(response.status === 400){
         this.setState({msg:"Verefique os campos.", cod:response.status});
         throw new Error('Verifique os campos');
       }
       if(response.status === 401){
           console.log("401")
           this.props.history.push('/');
         }
       else{
           this.setState({msg:"Entre em contato com o administrador.", cod:response.status});
           throw new Error('erro: '+ response.status+' nao foi possivel criar seu cadastro');
       }
       }).catch(error => {
           this.setState({msg:error.message});
       });
    }

    getTarefa(){
        const requestInfo = {
          method:'GET',
          dataType: 'json',
          headers:{'X-token': localStorage.getItem('token')}
          };
    //
          fetch("http://scrum-php.herokuapp.com/v1/tarefa/"+parseInt(this.props.idTarefa, 10), requestInfo)
          .then(response =>{
              if(response.status === 200 || response.status === 201){
                  console.log("RESPOSTA DO SERVIDOR, 200, AUTOTIZADO");
                  return response.json();
                }if(response.status === 401){
                  console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
                  //this.props.history.push('/logout/representante');
                }
          })
          .then(tarefa =>{      
              if(tarefa.length >0)
                console.log(tarefa[0].nome)          
                this.setState({nome:tarefa[0].nome, descricao: tarefa[0].descricao, prioridade: tarefa[0].prioridade});        
            });
       }
    render(){
         return(
            <div>
                 <form>
                <div className="form-group row">
                    <label className="col-2 col-form-label">Nome Tarefa</label>
                    <div className="col-10">
                        <input 
                            type="text" 
                            placeholder="Nome da tarefa" 
                            id="nome" 
                            className="form-control"
                            value={this.state.nome}
                            onChange={this.salvaAlteracao.bind(this, 'nome')}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label">Prioridade</label>
                    <div className="col-10">
                        <MuiThemeProvider>
                        <SelectField
                        value={this.state.prioridade}
                        onChange={this.handleChange}
                        autoWidth={true}
                        floatingLabelText="Prioridade"
                        >
                        <MenuItem value={1} primaryText="Alta"/>
                        <MenuItem value={2} primaryText="Media"/>
                        <MenuItem value={3} primaryText="Baixa"/>
                        </SelectField>
                        
                        </MuiThemeProvider>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label">Descrição</label>
                    <div className="col-10">
                        <textarea 
                            className="form-control"
                            id="exampleTextarea" 
                            placeholder="Descrição"
                            rows="1"
                            value={this.state.descricao}
                            onChange={this.salvaAlteracao.bind(this, 'descricao')}
                            required
                        >
                        </textarea>
                    </div>    
                </div>
              </form>
              
            </div>
        );
    }
}