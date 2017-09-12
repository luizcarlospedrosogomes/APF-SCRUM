import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default  class MenuEsquerdo extends Component{
    render(){
         return(
            <div>
                <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
                    <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <a className="nav-link active"
                         href="">{this.props.titulo} <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <Link to="/time" className="nav-link">
                         Times <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/scrumMaster" className="nav-link">
                         Projetos <span className="sr-only">(current)</span></Link>
                    </li>
                    </ul>
                </nav>
            </div>
        );
    }
}