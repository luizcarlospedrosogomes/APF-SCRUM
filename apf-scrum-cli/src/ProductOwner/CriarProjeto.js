import React, { Component } from 'react';
export default  class CriarProjeto extends Component{
    render(){
         return(
            <div>
                <form className="form-inline">
                <label className="mr-sm-2" htmlFor="nome">Nome Projeto</label>
                <input 
                    type="text" 
                    placeholder="Nome do projeto" 
                    id="nome" 
                    className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg"
                    required
                />
                <button 
                    type="submit" 
                    className="btn btn-primary btn-lg ">
                    Criar projeto
                </button>
              </form>
            </div>
        );
    }
}