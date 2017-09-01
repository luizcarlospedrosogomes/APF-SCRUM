import React, { Component } from 'react';
export default  class ScrumMaster extends Component{
    render(){
         return(
            <div>
                <form className="form-inline">
                    <label className="mr-sm-2" htmlFor="nome">SCRUM MASTER</label>
                    <input 
                        type="email" 
                        required 
                        className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg"
                    />
                    <button type="button" className="btn btn-primary btn-sm">Adicionar</button>
                </form>
            </div>
        );
    }
}