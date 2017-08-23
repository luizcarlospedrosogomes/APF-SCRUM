import React, { Component } from 'react';
export default  class Login extends Component{
    render(){
         return(
            <div>
                <div className="header">
                    <h1>Gerenciador Projetos Scrum</h1>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <div className="panel-title">Login</div>
                            </div>
                            
                            <div className="panel-body">
                                <form className="form-group">
                                    <input className="form-control" type="text" placeholder="Email" required="true"/>
                                    <input className="form-control" type="password"  placeholder="Senha" required="true"/>
                                    <button type="submit" className=" btn-fill btn-block btn btn-info btn-lg">Entrar</button>                       
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="panel panel-success">
                            <div className="panel-heading">
                                <div className="panel-title">Cadastro</div>
                            </div>
                            
                            <div className="panel-body">
                                <form className="form-group">
                                    <label for="email">Email</label>
                                    <input id="email" className="form-control" type="text" placeholder="Email" required="true"/>
                                    <label for="ftime">Função no time</label>
                                    <input id="ftime" className="form-control" type="text" placeholder="Função no time" required="true"/>
                                    <label for="senha">Senha</label>
                                    <input id="senha" className="form-control" type="password" placeholder="senha" required="true"/>
                                    <label for="rsenha">Repita a senha</label>
                                    <input id="rsenha" className="form-control" type="password"  placeholder="Repita a senha" required="true"/>
                                    <button type="submit" className=" btn-fill btn-block btn btn-success btn-lg">Cadastrar</button>                       
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}