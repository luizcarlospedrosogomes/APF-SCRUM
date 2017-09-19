import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import MenuSuperior from '../MenuSuperior';
import MenuEsquerdo from '../MenuEsquerdo';
import TipoContagem from './TipoContagem';

export default  class Contagem extends Component{
    constructor(props) {
        super(props);
        this.state = {lista : [], msg: '', tipoContagem:'', descricaoALI:'', descricaoTD:''
                      , descricaoTR:'', TD:'', TR:'' };    
    }  
    
    componentWillMount(){
      
    }

    enviarForm(evento){
        evento.preventDefault();
        console.log(this.state.tipoContagem)
        var tipoContagemStr = null;
        this.state.tipoContagem == 1 ? tipoContagemStr = 'ALI': null
        this.state.tipoContagem == 2 ? tipoContagemStr = 'AIE': null
        this.state.tipoContagem == 3 ? tipoContagemStr = 'EE': null
        this.state.tipoContagem == 4 ? tipoContagemStr = 'CE': null
        this.state.tipoContagem == 5 ? tipoContagemStr = 'SE': null
        console.log(tipoContagemStr)

        const requestInfo = {
            method:'POST',
            dataType: 'json',
            body:JSON.stringify({tipoContagem: tipoContagemStr
                                , TD:this.state.TD
                                , TR:this.state.TR
                                , descricaoALI: this.state.descricaoALI
                                , descricaoTD: this.state.descricaoTD
                                , descricaoTR: this.state.descricaoTR
                            }),
            headers: new Headers({'X-token': localStorage.getItem('token')})
            
        };
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/contagem/"+tipoContagemStr+"/"+parseInt(this.props.match.params.IDSprintBacklog, 10),requestInfo)            
        .then(response =>{
            if(response.status === 200 ||  response.status === 201){
                this.setState({cod:response.status, status:""});
                PubSub.publish("CriarContagem");
                return response.json();
            }
            if(response.status === 404 ){
                this.setState({msg:"dados não encontrado", cod:response.status});
            }
        })
    }

    salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
    }
  
    render(){
         return(
            <div>
                    <MenuSuperior tipoUsuario="Scrum Master"/>
             <div className="container-fluid">       
                    <MenuEsquerdo titulo="Contagem"/>
                <main className="col-sm-10 ml-sm-auto col-md-10 pt-3" role="main">
                    <div className="row">
                        <h5>Conjunto de dados</h5>
                    </div>
                    <span>{this.state.msg}</span>
                    <form onSubmit={this.enviarForm.bind(this)}>
                    <div className="card">
                        <div className="card-block">
                        <div className="row col-12">
                            <div className="form-group row col-12">
                                <label  htmlFor="example-text-input" 
                                        className="col-md-2.5 col-lg-2.5 col-form-label"
                                 >
                                        Selecione Tipo contagem
                                </label>
                                <div className="col-1.5 col-md-1.5 col-lg-1.5">
                                    <select className="custom-select mb-2 mr-sm-2 mb-sm-0" 
                                                id="inlineFormCustomSelect"
                                                ///value={this.state.time}
                                                onChange={this.salvaAlteracao.bind(this, 'tipoContagem')}
                                                required
                                            >
                                            <option value="">selecione</option>
                                            <option  value={1}>ALI</option>   
                                            <option  value={2}>AIE</option> 
                                            <option  value={3}>EE</option> 
                                            <option  value={4}>CE</option> 
                                            <option  value={5}>SE</option> 
                                    </select>
                                </div>
                               
                                <label  htmlFor="example-text-input" 
                                        className="col-1.5 col-md-1.5 col-lg-1.5 col-form-label"
                                >
                                        Descrição
                                </label>
                                <div className="col-7 col-md-7 col-lg-7">
                                    <textarea  className="form-control"
                                        rows="1"
                                        placeholder="Descrição" 
                                        id="example-text-input"
                                        value={this.state.descricaoALI}
                                        onChange={this.salvaAlteracao.bind(this, 'descricaoALI')}
                                        required="true"
                                    >
                                    </textarea>
                                </div>
                            </div>
                       
                    </div>
                    </div>
                    </div>
                    <div className="row">
                        <h5>Complexidade</h5>
                    </div>
                    <div className="card">
                        <div className="card-block">
                            <div className="row">
                            <div className="form-group row col-12">
                            <div className="col-md-1 col-lg-1" >
                                Tipo Dados
                            </div>
                            <label  htmlFor="example-text-input" 
                                        className="col-md-1.5 col-lg-1.5 col-form-label"
                                >
                                        Quantidade
                                </label>
                                <div className="col-md-2 col-lg-2">
                                    <input className="form-control" 
                                        type="text" 
                                        placeholder="Quantidade" 
                                        id="example-text-input"
                                        value={this.state.TD}
                                        onChange={this.salvaAlteracao.bind(this, 'TD')}
                                        required="true"
                                    />
                                </div>
                                <label  htmlFor="example-text-input" 
                                        className="col-1.5 col-md-1.5 col-lg-1.5 col-form-label"
                                >
                                        Descrição
                                </label>
                                <div className="col-7 col-md-7 col-lg-7">
                                    <textarea  rows="1" className="form-control" 
                                        type="text" 
                                        placeholder="Descrição" 
                                        id="example-text-input"
                                        value={this.state.descricao_TD}
                                        onChange={this.salvaAlteracao.bind(this, 'descricao_TD')}
                                        required="true"
                                    />
                                </div>
                        </div>
                        </div>
                    <div className="row">
                        <div className="form-group row col-12">
                            <div className="col-md-1 col-lg-1" >
                                  Tipo Registro
                            </div>
                            <label  htmlFor="example-text-input" 
                                        className="col-md-1.5 col-lg-1.5 col-form-label"
                                >
                                        Quantidade
                                </label>
                                <div className="col-md-2 col-lg-2">
                                    <input className="form-control" 
                                        type="text" 
                                        placeholder="Quantidade" 
                                        id="example-text-input"
                                        value={this.state.TR}
                                        onChange={this.salvaAlteracao.bind(this, 'TR')}
                                        required="true"
                                    />
                                </div>
                                <label  htmlFor="example-text-input" 
                                        className="col-1.5 col-md-1.5 col-lg-1.5 col-form-label"
                                >
                                        Descrição
                                </label>
                                <div className="col-7 col-md-7 col-lg-7">
                                <textarea  rows="1" className="form-control" 
                                        type="text" 
                                        placeholder="Descrição" 
                                        id="example-text-input"
                                        value={this.state.descricao_TR}
                                        onChange={this.salvaAlteracao.bind(this, 'descricao_TR')}
                                        required="true"
                                    />
                                </div>
                        </div>
                    </div>
                    </div>
                </div>
                <br/>
                    <div className="row col-12">
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-lg  btn-block">
                            inserir complexidade
                        </button>        
                    </div>
                    </form>
                <div className="row col-md-12 no-gutters">
                    <TipoContagem key={1} IDTarefa={this.props.match.params.IDSprintBacklog} tipoContagem="ALI" />   
                    <TipoContagem key={2} IDTarefa={this.props.match.params.IDSprintBacklog} tipoContagem="AIE" /> 
                    <TipoContagem key={3} IDTarefa={this.props.match.params.IDSprintBacklog} tipoContagem="EE" /> 
                    <TipoContagem key={4} IDTarefa={this.props.match.params.IDSprintBacklog} tipoContagem="CE" /> 
                    <TipoContagem key={5} IDTarefa={this.props.match.params.IDSprintBacklog} tipoContagem="SE" /> 
                </div>
                </main>    
            </div>
            </div>
        );
    }
}