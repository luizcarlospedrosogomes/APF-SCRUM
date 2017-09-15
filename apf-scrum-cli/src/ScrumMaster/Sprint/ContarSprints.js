import React, { Component } from 'react';

export default  class ContarSprints extends Component{
    
    constructor(props) {
        super(props);
        this.state = {NSprint:0, msg: '' };    
      }
    componentWillMount(){
        this.contarSprint();
    }
    contarSprint(){
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'X-token': localStorage.getItem('token')}
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/sprint/contar/"+this.props.IDProjeto, requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
                console.log("RESPOSTA DO SERVIDOR, 200, AUTOTIZADO");
                return response.json();
              }if(response.status === 401){
                console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
                //this.props.history.push('/logout/representante');
              }
        })
        .then(NSprint =>{
            this.setState({NSprint:NSprint});        
            
          });
    }
    
    render(){
         return(
            <div>{this.state.NSprint}</div>
        );
    }
}