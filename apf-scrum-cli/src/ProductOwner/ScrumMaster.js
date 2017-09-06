import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default  class ScrumMaster extends Component{
    constructor(props) {
        super(props);
        this.state = {msg:''
                    , email:''
                    , vinculado:'NAO'
                }
     }
     
     componentWillMount(){
        this.getScrumMaster();
     }
     salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
     }
     getScrumMaster(){
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers: new Headers({'X-token': localStorage.getItem('token')})
        };
        fetch("http://scrum-php.herokuapp.com/v1/equipe/scrummaster/"+parseInt(this.props.idProjeto, 10),requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                PubSub.publish("atualizaLista");
                this.setState({msg:"ScrumMaster já vinculado ao projeto", cod:response.status, vinculado:'SIM'});   
                return response.json();
            }
        })
        .then(scrumMaster =>{
               this.setState({email:scrumMaster.email});        
            
          });         
     }

     enviaForm(evento){
        evento.preventDefault();
        var OP;
        {this.state.vinculado === 'SIM' ? OP = 'DELETE' : OP = 'POST'}
        
         const requestInfo = {
            method:OP,
            body:JSON.stringify({email:this.state.email}),
            headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
        };
        console.log("dados enviados:"+  requestInfo.body);

        fetch("http://scrum-php.herokuapp.com/v1/equipe/scrummaster/"+parseInt(this.props.idProjeto, 10),requestInfo)            
        .then(response =>{
        if(response.status === 200 || response.status === 201 ){
            PubSub.publish("adicionarScrumMaster");
            this.setState({msg:"Projeto criado com sucesso"
                            , cod:response.status
                            , vinculado:OP === 'POST' ? 'SIM' : 'NAO'
                            , email:OP === 'POST' ? this.state.email : ''});   
            return response;
        }
        if(response.status === 400 || response.status === 404){
            console.log("scrum master nao encontrado")
          this.setState({msg:"Verefique os campos.", cod:response.status, email:'nao encontrado'});
          throw new Error('Verifique os campos');
        }
        if(response.status === 401){
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
            <div>
                <form className="form-inline" onSubmit={this.enviaForm.bind(this)}>
                    <label className="mr-sm-2" htmlFor="nome">SCRUM MASTER</label>
                    <input 
                        placeholder="email@valido.com" 
                        type="email" 
                        className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg"
                        value={this.state.email}
                        onChange={this.salvaAlteracao.bind(this, 'email')}
                        
                        disabled = {(this.state.vinculado) === 'SIM' ? true : false }
                    />
                    <button 
                        type="submit" 
                        className={`btn  btn-sm ${this.state.vinculado === 'SIM' ? 'btn-danger' : 'btn-primary'}`}>
                        {this.state.vinculado === 'SIM' ? 'Remover' : 'Adicionar'}
                    </button>
                </form>
            </div>
        );
    }
}