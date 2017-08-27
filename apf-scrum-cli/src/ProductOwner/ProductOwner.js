import React, { Component } from 'react';
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
    
                 
        <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">Projetos <span className="sr-only">(current)</span></a>
          </li>
          </ul>

      </nav>
      </div>
        );
    }
}