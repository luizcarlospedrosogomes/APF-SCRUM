import React, { Component } from 'react';
import PubSub from 'pubsub-js';
export default  class BuscarTime extends Component{
    constructor(props) {
        super(props);
        this.state = {lista : [], status: '', cod:'', nomeTime:'', idTime:'' };    
      }
    
      componentWillMount(){
        this.buscarTime();

        if (localStorage.getItem("token") === null) {
          this.props.history.push('/');
        }
      }
    
      buscarTime(){ 
        this.setState({status:'enviando'})   
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'X-token': localStorage.getItem('token')}
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/time/"+parseInt(this.props.idTime, 10), requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
                this.setState({status:'', cod:response.status});
                return response.json();
            }else
                this.setState({status:'', cod:response.status});
        })
        .then(time =>{
            this.setState({nomeTime:time.nome,idTime:time.id});        
            
          });
    }

    enviaForm(e){
        e.preventDefault();
        this.setState({status:'enviando'})
        const requestInfo = {
            method:'DELETE',
            dataType: 'json',
            body:JSON.stringify({ id_projeto:parseInt(this.props.idProjeto,10)}),
            headers:{'X-token': localStorage.getItem('token')}
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/time/"+parseInt(this.state.idTime, 10), requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
                PubSub.publish("removerTimeProjeto");  
                this.setState({status:'', cod:response.status});
                return response.json();
            }else
            this.setState({status:'', cod:response.status});              
        })
    }

    render(){
         return(
            <div>
                <form className="form-inline"  onSubmit={this.enviaForm.bind(this)}>
                    <input type="hidden" value={this.state.idTime}/>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="input-group">
                        <input type="text" value={this.state.nomeTime} disabled className="form-control"/>
                        <span className="input-group-btn">
                            <button className="btn btn-danger" type="submit">Remover Time!</button>
                        </span>
                        </div>
                    </div>     
                </form>
            </div>
        );
    }
}