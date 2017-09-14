import React, { Component } from 'react';
import MenuSuperior from '../MenuSuperior';
export default  class SprintBacklog extends Component{
    render(){
         return(
            <div>
                <MenuSuperior tipoUsuario="Scrum Master" titulo="Sprint Backlog"/>
                <div className="container-fluid">       
                    <main className="col-sm-10 ml-sm-auto col-md-10 pt-3" role="main">
                            <div className="row">
                            </div>
                    </main>
                </div>
            </div>
        );
    }
}