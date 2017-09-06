import React, { Component } from 'react';

import {Link} from 'react-router-dom';

export default  class MenuSuperior extends Component{
    render(){
         return(
            <div>
                <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
                    <button className="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to="/productOwner" className="navbar-brand">Product Owner</Link>            
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto"></ul>
                    
                        <Link to="/logout">
                            <button 
                                className="btn btn-outline-success my-2 my-sm-0"
                                 type="submit"
                            >       
                            Sair
                            </button>
                        </Link>                       
                    
                    </div>
                </nav>
            </div>
        );
    }
}