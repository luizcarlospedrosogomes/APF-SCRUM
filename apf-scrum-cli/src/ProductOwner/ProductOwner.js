import React, { Component } from 'react';
import { Link  } from 'react-router-dom';

//COMPONENTES
import ScrumMaster from './ScrumMaster';
import CriarProjeto from './CriarProjeto';
export default  class ProductOwner extends Component{
    render(){
         return(
        <div>
            <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
            <button className="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">Product Owner</a>
      
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <ul className="navbar-nav mr-auto">
                
              </ul>
              <form className="form-inline mt-2 mt-md-0">
                
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sair</button>
              </form>
            </div>
          </nav>
    
      <div className="container-fluid">       
        <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="">Projetos <span className="sr-only">(current)</span></a>
          </li>
          </ul>

      </nav>
     
      <div className="row">
      <div class="col-md-10 col-md-offset-1">
          <div className="display-3">
          <form>
              <inptu type="text"/>
            </form> 
          </div>
            
          </div>
          </div>
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
                                    className="btn btn-primary btn-lg btn-block">
                                    Arquivar
                                </button>                                
                                <button 
                                      type="button" 
                                      className="btn btn-secondary btn-lg btn-block">
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
                      SCRUM MASTER: 
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