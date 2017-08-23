import React, { Component } from 'react';
import {Route,  BrowserRouter as Router, Switch} from 'react-router-dom';



//COMPONENTES
import Login from './Login/Login';

export default  class App extends Component{

    render(){
        return(
           <Router>
               
     <div id="wrapper">
              
              <div className="container">
                    
                  <Switch> 
                          <Route  path="" exact    component={ Login }/>
                  </Switch> 
              </div>
              
              <footer className="footer">
                  <div className="container-fluid">
                      <nav className="pull-left">
                          <ul>
                          </ul>
                      </nav>
                  </div>
              </footer>
      </div>
</Router>
        );
    }
}
