import React, { Component } from 'react';
export default  class CriarTarefa extends Component{
    render(){
         return(
            <div>
                <form className="form-inline">
                <div className="input-group input-group-lg">
                    <input 
                        type="text" 
                        placeholder="Nome da tarefa" 
                        id="nome" 
                        className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg"
                        required
                    />
                    <select className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg" required>
                    <option value="volvo">Prioridade</option>
                    <option value="saab">Alta</option>
                    <option value="mercedes">Media</option>
                    <option value="audi">Baixa</option>
                    
                  </select>

            
                    <textarea 
                        className="form-control mb-2 mr-sm-2 mb-sm-0 input-lg"
                        id="exampleTextarea" 
                        placeholder="Descrição"
                        rows="1"
                        required
                    >
                    </textarea>
                        
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary btn-lg "
                    
                >
                    Criar Tarefa
                </button>
              </form>
              <p></p>
            </div>
        );
    }
}