import React, { Component } from 'react';
export default  class PegarTarefa extends Component{
    constructor(props) {
        super(props);
        this.state = { msg: '', nomeTarefa:'',descricaoTarefa:'' };    
    }  
    componentWillMount(){
        this.getTarefa();
    }

    getTarefa(){
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers: new Headers({'X-token': localStorage.getItem('token')})
        }; 
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/contagem/tarefa/"+parseInt(this.props.IDTarefa, 10),requestInfo)            
        .then(response =>{
            if(response.status === 200 ||  response.status === 201){
                this.setState({cod:response.status, status:""});
                return response.json();
            }
            if(response.status === 404 )
                this.setState({msg:"dados não encontrado", cod:response.status});
            
        })
        .then(tarefa =>{
           if(tarefa)
                this.setState({nomeTarefa:tarefa.nome, descricaoTarefa: tarefa.descricao });
        }) 
    }
    render(){
         return(
            <div className="jumbotron">
                    <h4 className="display-5">{this.state.nomeTarefa}</h4>
                    <p>{this.state.descricaoTarefa}</p>
            </div>
        );
    }
}