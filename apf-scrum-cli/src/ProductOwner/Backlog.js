import React, { Component } from 'react';

import MenuSuperior from './MenuSuperior';
import MenuEsquerdo from './MenuEsquerdo';
import CriarTarefa from './CriarTarefa';

export default  class Backlog extends Component{
    render(){
         return(
            <div>
                <MenuSuperior/>    
                <div className="container-fluid">       
                <MenuEsquerdo titulo="Backlog"/>
                    <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                        <div className="row">
                            <CriarTarefa/>
                        </div>
                        <div className="row">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Prioridade</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Contagem</th>
                                    <th>Entregue</th>
                                    <th>Editar</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>                            
                            <tbody>
                                <tr>
                                    <td>Alta</td>
                                    <td>Criar Sprint Backlog</td>
                                    <td>Lista o backlog para o Scrum master para que ele defina junto com a equipe 
                                        quais tarefas serão executadas
                                    </td>
                                    <td>140</td>
                                    <th>NAO</th>
                                    <td>Editar</td>
                                    <td>Excluir</td>
                                </tr>                            
                            </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}