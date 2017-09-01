import React, { Component } from 'react';
export default  class ScrumMaster extends Component{
    render(){
         return(
            <div>
                <form>
                    <input type="email" required/>
                    <button type="button" className="btn btn-primary btn-sm">Adicionar</button>
                </form>
            </div>
        );
    }
}