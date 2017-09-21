import React, { Component } from 'react';
import MenuSuperior from './MenuSuperior';
import MenuEsquerdo from './MenuEsquerdo';
import ListarTarefas from './ListarTarefas';


export default  class ScrumTeam extends Component{
    render(){
         return(
            <div>
                <MenuSuperior/>    
                <div className="container-fluid">       
                    <MenuEsquerdo titulo="Tarefas"/>
                     <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main" key="sjsjsj">
                         <ListarTarefas/>
                     </main>
                </div>
            </div>
        );
    }
}