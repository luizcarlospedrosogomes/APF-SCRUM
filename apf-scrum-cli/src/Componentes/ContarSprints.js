import React, { Component } from 'react';

import Progess from './Progress';
export default  class ContarSprints extends Component{
    
    constructor(props) {
        super(props);
        this.state = {NSprint:0, status: '' };    
      }
    componentWillMount(){
        this.contarSprint();
    }
    contarSprint(){
        this.setState({status:'enviando'})
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'X-token': localStorage.getItem('token')}
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/sprint/contar/"+this.props.IDProjeto, requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
                this.setState({status:'', cod: response.status})
                return response.json();
            }else
                this.setState({status:'', cod: response.status})
        })
        .then(NSprint =>{
            if(NSprint)
                this.setState({NSprint:NSprint});        
          });
    }
    
    render(){
         return(
            <div>
                <Progess tipo='circular' status={this.state.status}/>
                {this.state.NSprint}
            </div>
        );
    }
}