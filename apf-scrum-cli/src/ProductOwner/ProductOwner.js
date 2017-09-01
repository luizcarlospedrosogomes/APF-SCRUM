import React, { Component } from 'react';
import { Link  } from 'react-router-dom';

//COMPONENTES
import ScrumMaster from './ScrumMaster';
import CriarProjeto from './CriarProjeto';
import MenuSuperior from './MenuSuperior';
import MenuEsquerdo from './MenuEsquerdo';

export default  class ProductOwner extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    if (localStorage.getItem("token") === null) {
      this.props.history.push('/?status=NAO_AUTENTICADO');
    }
  }
    render(){
         return(
        <div>
           <MenuSuperior/>    
      <div className="container-fluid">       
          <MenuEsquerdo titulo="Projetos"/>
      <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
      <div className="row">
        <div className="col-sm-12">
            <div className="card">
              <div className="card-block">
                <CriarProjeto/>              
              </div>
           </div>  
          </div>    
        
      </div>
      <br/>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-primary text-white">PROJETO</div>
                <div className="card-block">
                    <div className="row">
                        <div className="col-lg-4">                            
                              <div className="card">                      
                                <div className="card-block">
                                  <div className="content h1">100%</div>
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
                                      <Link to="/backlog">Backlog</Link>
                                </button>
                              </div>
                            </div>                        
                          </div>   
                       </div>
                    </div>
                </div>
                  <div className="card-footer">
                    <div className="row"> 
                        <ScrumMaster/>
                    </div>
                 </div>             
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
                <div className="card-header">
                    Featured
                </div>
                <div className="card-block">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="photo-box">
                                <img className="img-fluid" src="http://placehold.it/400x300" alt="image"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="photo-box">
                                <img className="img-fluid" src="http://placehold.it/400x300" alt="image"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="photo-box">
                                <img className="img-fluid" src="http://placehold.it/400x300" alt="image"/>
                            </div>
                        </div>
                    </div>
                    <p></p>
                    <div className="row">
                        <div className="col-md-2">
                            <div className="photo-box">
                                <img className="img-fluid" src="http://placehold.it/400x300" alt="image"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="photo-box">
                                <img className="img-fluid" src="http://placehold.it/400x300" alt="image"/>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="photo-box">
                                <img className="img-fluid" src="http://placehold.it/400x300" alt="image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </main>
        </div>
      </div>
        );
    }
}