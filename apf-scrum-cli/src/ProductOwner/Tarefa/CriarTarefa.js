import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default  class CriarTarefa extends Component{
    
    constructor(props) {
        super(props);
        this.state = {msg:''
                    , nome:''
                    , prioridade:1
                    , descricao:''
                    
                }
                
    }
    componentDidMount() {}
   
    salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
    }
    
    enviaForm(evento){
        evento.preventDefault();
        console.log(localStorage.getItem('token'));
         const requestInfo = {
            method:'POST',
            body:JSON.stringify({ nome:this.state.nome
                                , descricao: this.state.descricao
                                , id_projeto: parseInt(this.props.idProjeto, 10)
                                , prioridade: this.state.prioridade
                            }),
            headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
        };
        fetch("http://scrum-php.herokuapp.com/v1/tarefa",requestInfo)            
        .then(response =>{
        if(response.status === 200 || response.status === 201 ){
            this.setState({msg:"Tarefa criada com sucesso", cod:response.status});
            PubSub.publish("atualizaListaTarefa");      
            return response;
        }
        if(response.status === 400)
          this.setState({msg:"Verefique os campos.", cod:response.status})        
        if(response.status === 401)
            this.props.history.push('/');
        });
        
    }
    render(){
         return(
            <div className="col-12 col-sm-12 col-md-10">
                <form className="form-inline" onSubmit={this.enviaForm.bind(this)}>
                <div className="input-group input-group-lg">
                    <input 
                        type="text" 
                        placeholder="Nome da tarefa" 
                        id="nome" 
                        className="form-control mb-2 mr-sm-2 mb-sm-0 input-sm"
                        value={this.state.nome}
                        onChange={this.salvaAlteracao.bind(this, 'nome')}
                        required
                    />
                    <select className="custom-select mb-2 mr-sm-2 mb-sm-0" 
                    id="inlineFormCustomSelect"
                    ///value={this.state.time}
                    onChange={this.salvaAlteracao.bind(this, 'prioridade')}
                    required
                            >
                            <option value="">Prioridade</option>
                            <option  value={1}>Alta</option>   
                            <option  value={2}>Média</option> 
                            <option  value={3}>Baixa</option> 
                    </select>
                    <textarea 
                        className="form-control mb-2 mr-sm-2 mb-sm-0 input-sm"
                        id="exampleTextarea" 
                        placeholder="Descrição"
                        rows="1"
                        value={this.state.descricao}
                        onChange={this.salvaAlteracao.bind(this, 'descricao')}
                        required
                    >
                    </textarea>
                        
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary btn-lg "
                    
                >
                    Criar Tarefa
                </button>
              </form>
              <p></p>
            </div>
        );
    }
}