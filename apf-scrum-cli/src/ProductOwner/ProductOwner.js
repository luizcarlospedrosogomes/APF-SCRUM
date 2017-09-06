import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import PubSub from 'pubsub-js';
//COMPONENTES
import ScrumMaster from './ScrumMaster';
import CriarProjeto from './CriarProjeto';
import MenuSuperior from './MenuSuperior';
import MenuEsquerdo from './MenuEsquerdo';

export default  class ProductOwner extends Component{
  constructor(props) {
    super(props);
    this.state = {lista : [], msg: '' };    
  }

  componentWillMount(){
    this.preencheLista();

    PubSub.subscribe('atualizaLista', function(topico){
        this.preencheLista();
      }.bind(this)); 

    if (localStorage.getItem("token") === null) {
      this.props.history.push('/');
    }
  }
  preencheLista(){ 

        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'X-token': localStorage.getItem('token')}
        };

        fetch("http://scrum-php.herokuapp.com/v1/projeto", requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
                console.log("RESPOSTA DO SERVIDOR, 200, AUTOTIZADO");
                return response.json();
              }if(response.status === 401){
                console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
                //this.props.history.push('/logout/representante');
              }
        })
        .then(projetos =>{
            console.log("DADOS RECEBIDOS:" +projetos);
            if(projetos.length > 0){
               this.setState({lista:projetos});        
            }
          });
    }

    render(){
         return(
        <div>
           <MenuSuperior/>    
      <div className="container-fluid">       
          <MenuEsquerdo titulo="Projetos"/>
      <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main" key="sjsjsj">
      <div className="row" key="linhaCriarProjeto">
        <div className="col-sm-12">
            <div className="card">
              <div className="card-block">
                <CriarProjeto/>              
              </div>
           </div>  
          </div>    
        
      </div>
      <br/>
     
        <div className="row" key="linhaProjeto">
          { this.state.lista.map(function(projeto){
           return (
            <div className="col-md-6" key={projeto.id}>
              <div className="card">
              
                <div className="card-header bg-primary text-white">
                            PROJETO: {projeto.nome} - 
                     <span className="text-right"> {projeto.id}</span>
               </div>
                <div className="card-block">
                    <div className="row" >
                        <div className="col-lg-4" >                            
                              <div className="card" >                      
                                <div className="card-block" >
                                  <div className="content h1" >100%</div>
                                </div>
                                  <div className="card-footer text-center small bg-danger text-white">CONCLUIDO</div>             
                              </div>
                        </div>
                        <div className="col-lg-4">   
                        <div className="card">                      
                                <div className="card-block">
                                  <div className="content h1 text-center">6</div>
                                </div>                                
                                <div className="card-footer text-center small bg-warning text-white ">QTD EQUIPE</div>             
                              </div>                       
                        </div>
                        <div className="col-lg-4">  
                          <div className="card">                      
                              <div className="card-block">
                                  <div className="content h1 text-center">0</div>
                              </div>
                                <div className="card-footer text-center small bg-success text-white">CONTAGEM</div>             
                          </div>                                      
                        </div>
                    </div>
                    <p></p>
                    <div className="row">
                        <div className="col-md-4">  
                          <div className="card"> 
                          <div className="card-header text-center small">DATA ENTREGA</div>
                            <div className="card-block"><b>05/09/2017</b></div>
                          </div>
                          
                        </div>
                        
                        <div className="col-md-4">
                          <div className="card">                      
                            <div className="card-block">
                              <div className="content h1 text-center">0</div>
                            </div>
                            <div className="card-footer text-center small bg-info text-white">TAREFA</div>             
                          </div>   
                        </div>

                        <div className="col-md-4">
                          <div className="card">                      
                            <div className="card-body">
                              <div className="row">
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-sm btn-block">
                                    Arquivar
                                </button>                                
                                <button 
                                      type="button" 
                                      className="btn btn-secondary btn-sm btn-block">
                                      <Link to={'/promocao/editar/'+projeto.id}>Backlog</Link>      
                                                                    
                                </button>
                              </div>
                            </div>                        
                          </div>   
                       </div>
                    </div>
                </div>
                  <div className="card-footer">
                    <div className="row"> 
                        <ScrumMaster idProjeto= {projeto.id}/>
                    </div>
                 </div>             
            </div>
            <br/>
          </div>
          
            );
           })
          } 
          
        </div>
        
        </main>
        </div>
      </div>
        );
    }
}