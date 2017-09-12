import React, { Component } from 'react';
import PubSub from 'pubsub-js';
export default  class CriarTime extends Component{
     
    constructor(props) {
        super(props);
        this.state = {msg:''
                    , nome:''
                    , cod:''
                }
     }
     
     salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
     }
     
     enviaForm(evento){
        evento.preventDefault();
        console.log(localStorage.getItem('token'))
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({ nome:this.state.nome}),
            headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
        };

        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/time",requestInfo)            
        .then(response =>{
        if(response.status === 200 || response.status === 201 ){
            this.setState({msg:"Scrum Team criado com sucesso", cod:response.status});
            PubSub.publish("atualizaListaTime");      
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
    render(){
         return(
            <div className="col-12 col-sm-12 col-md-12">
                <form className="form-inline" onSubmit={this.enviaForm.bind(this)}>
                <label className="mr-sm-2" htmlFor="nome">Nome Scrum Team</label>
                <input 
                    type="text" 
                    placeholder="Nome Scrum Team" 
                    id="nome" 
                    className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg"
                    value={this.state.nome}
                    onChange={this.salvaAlteracao.bind(this, 'nome')}
                    required
                />
                <button 
                    type="submit" 
                    className="btn btn-primary btn-lg ">
                    Criar time
                </button>
            </form>
        </div>
        );
    }
}