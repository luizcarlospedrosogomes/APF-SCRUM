import React, { Component } from 'react';
export default  class Pontos extends Component{
    constructor(props) {
        super(props);
        this.state = { pontos:''};
    }

    componentWillMount(){
        this.getPontos();
    }
    getPontos(){
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'X-token': localStorage.getItem('token')}
        };
        fetch("http://scrum-php.herokuapp.com/v1/pontos/tarefa/"+parseInt(this.props.IDTarefa, 10), requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201)
                return response.json();
        })
        .then(pontos =>{
            //console.log(pontos)
                  this.setState({pontos:pontos});        
        });
    }
    
    render(){
         return(
            <div>{this.state.pontos}</div>
        );
    }
}