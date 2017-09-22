import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import MenuSuperior from '../MenuSuperior';
import MenuEsquerdo from '../MenuEsquerdo';
import FormatarData from '../../Componentes/FormatarData'
export default  class ListarSprintProjeto extends Component{
    
    constructor(props) {
        super(props);
        this.state = { open: false, sprints:[]};
    }

    componentWillMount(){
       this.getSprints();
    }

    handleToggle = () => {
        this.setState({
          open: !this.state.open,
        });
    };
    
    handleNestedListToggle = (item) => {
        this.setState({
          open: item.state.open,
        });
    };
    
    getSprints(){
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'X-token': localStorage.getItem('token')}
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/sprint/projeto/"+parseInt(this.props.match.params.IDProjeto,10), requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201)
                return response.json();
              if(response.status === 401)
                ''
              
        })
        .then(sprints =>{
            if(sprints && sprints.length)
                this.setState({sprints:sprints});        
          });
    }  

    render(){
        if(!this.state.sprints && !this.state.sprints.length){
            return(
                <div>
                    <MenuSuperior tipoUsuario="Scrum Master" titulo="Sprints"/>
                    <div className="container-fluid"> 
                        <MenuEsquerdo titulo="Sprint"/>      
                        <main className="col-sm-10 ml-sm-auto col-md-10 pt-3" role="main" key="main">
                            <h3>NÃO EXISTE SPRINTS PARA ESTE PROJETO</h3>
                        </main>
                    </div>
                </div>
            );
        }
         return(
            <MuiThemeProvider>
            <div> 
                <MenuSuperior tipoUsuario="Scrum Master" titulo="Sprints"/>
                <div className="container-fluid"> 
                    <MenuEsquerdo titulo="Sprint"/>      
                    <main className="col-sm-10 ml-sm-auto col-md-10 pt-3" role="main" key="main">
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-12"> 
                                { this.state.sprints.map(function(sprint, i){
                                    return (
                                    <div className="card" key={i}>
                                        <div className="card-block">
                                            <div className="row" key={i}>
                                                <div className="col-6 col-md-1 col-lg-1" key={i}>  
                                                    Sprint {sprint.IDSprint}
                                                </div>
                                                <div className="col-6 col-md-2 col-lg-2">  
                                                    Data de Inicio:
                                                    <hr/>
                                                    <FormatarData data={sprint.dataCriacao.date}/>
                                                </div>
                                                <div className="col-6 col-md-2 col-lg-2">  
                                                    Data Entrega 
                                                    <hr/>
                                                    <FormatarData data={sprint.dataEntrega.date}/>
                                                    
                                                </div>
                                                <div className="col-6 col-md-3 col-lg-3">  
                                                    <RaisedButton label="Adicionar item ao sprint"/>
                                                </div>
                                                <div className="col-6 col-md-3 col-lg-3" >  
                                                    <Link to={"/scrummaster/sprint/"+sprint.IDSprint}>Tarefas</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                                }
                                    
                                </div>
                            </div>
                    </main>
                </div>
            </div>
            </MuiThemeProvider>
        );
    }
}