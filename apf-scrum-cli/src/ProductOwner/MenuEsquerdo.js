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
                        <Link to="/productOwner" className="nav-link">
                         Criar Projeto <span className="sr-only">(current)</span></Link>
                    </li>
                    </ul>
                </nav>
            </div>
        );
    }
}