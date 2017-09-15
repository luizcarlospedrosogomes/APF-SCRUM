import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default  class AdicionarTime extends Component{
    
    constructor(props) {
        super(props);
        this.state = {lista : [], msg: '', time:'' };    
    }

    componentWillMount(){
        this.preencheLista();
    
        PubSub.subscribe('atualizaListaTime', function(topico){
            this.preencheLista();
          }.bind(this)); 
    
        if (localStorage.getItem("token") === null) {
          this.props.history.push('/');
        }
      }

      salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
     }

     enviaForm(evento){
        evento.preventDefault();
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({ time:parseInt(this.state.time,10)}),
            headers:new Headers({'content-type' : 'application/json',  'X-Token': localStorage.getItem('token')})
        };
//
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/projeto/time",requestInfo)            
        .then(response =>{
        if(response.status === 200 || response.status === 201 ){
            this.setState({msg:"Scrum Team criado com sucesso", cod:response.status});
            PubSub.publish("associarTime");      
            return response;
        }
        if(response.status === 400){
          this.setState({msg:"Verefique os campos.", cod:response.status});
        }
        if(response.status === 401){
            this.props.history.push('/');
          }
        }); 
    }
      preencheLista(){ 
    
            const requestInfo = {
                method:'GET',
                dataType: 'json',
                headers:{'X-token': localStorage.getItem('token')}
            };
    
            fetch("http://scrum-php.herokuapp.com/v1/scrummaster/time", requestInfo)
            .then(response =>{
                if(response.status === 200 || response.status === 201){
                    console.log("RESPOSTA DO SERVIDOR, 200, AUTOTIZADO");
                    return response.json();
                  }if(response.status === 401){
                    console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
                    //this.props.history.push('/logout/representante');
                  }
            })
            .then(times =>{
                this.setState({lista:times});        
                console.log("DADOS RECEBIDOS:" +times);
              });
        }
    render(){
         return(
            <div>
                <form className="form-inline"  onSubmit={this.enviaForm.bind(this)}>
                    <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Time</label>
                    <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect"
                    ///value={this.state.time}
                    onChange={this.salvaAlteracao.bind(this, 'time')}
                    >
                    <option selected>selecione</option>
                    { this.state.lista.map(function(time){
                         return (
                            <option key={time.id} value={time.id}>{time.nome}</option>   
                            )
                        }
                    )}
                        
                    </select>
                    <button type="submit" className="btn btn-primary">Associar</button>
                </form>
            </div>
        );
    }
}