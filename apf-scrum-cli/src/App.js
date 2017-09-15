import React, { Component } from 'react';
import {Route,  BrowserRouter as Router, Switch} from 'react-router-dom';

//COMPONENTES
import ScrumMaster   from './ScrumMaster/ScrumMaster';
import ProductOwner  from './ProductOwner/ProductOwner';
import Backlog       from './ProductOwner/Backlog';
import Desenvolvedor from './Desenvolvedor/Desenvolvedor';
import Login         from './Login/Login';
import Logout         from './Login/Logout';
import Time           from './ScrumMaster/Time/Time';
import SprintBacklog from './ScrumMaster/Sprint/SprintBacklog';
import ListarSprintProjeto from './ScrumMaster/Sprint/ListarSprintProjeto';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
export default  class App extends Component{

    render(){
        return(
           <Router>
            <div>
          
            <div className="container-fluid">
            <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                <section className="row text-center placeholders">
                </section>
            </main>
                  <Switch> 
                          <Route  path="/" exact            component={ Login }/>
                          <Route  path="/logout"            component={ Logout }/>
                          <Route  path="/productOwner"      component={ ProductOwner }/>
                          <Route  path="/backlog/:idProjeto" component={ Backlog }/>
                          <Route  path="/sprint/projeto/:IDProjeto" component={ ListarSprintProjeto }/>
                          <Route  path="/scrummaster/sprint/:IDSprint" component={ SprintBacklog }/>
                          <Route  path="/scrumMaster"        component={ ScrumMaster }/>
                          <Route  path="/time"   component={ Time }/>
                          <Route  path="/desenvolvedor"      component={ Desenvolvedor }/>
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
