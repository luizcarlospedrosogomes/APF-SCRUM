import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default  class FormTarefa extends Component{
    constructor(props) {
        super(props);
        this.state = {msg:''
                    , nome:''
                    , prioridade:1
                    , descricao:''
        }       
    }
    salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
    }
    render(){
         return(
            <div>
                 <form onSubmit="">
                <div className="form-group row">
                    <label className="col-2 col-form-label">Nome Tarefa</label>
                    <div className="col-10">
                        <input 
                            type="text" 
                            placeholder="Nome da tarefa" 
                            id="nome" 
                            className="form-control"
                            value={this.state.nome}
                            onChange={this.salvaAlteracao.bind(this, 'nome')}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label">Prioridade</label>
                    <div className="col-10">
                        <MuiThemeProvider>
                        <SelectField
                        value={this.state.prioridade}
                        onChange={this.handleChange}
                        autoWidth={true}
                        floatingLabelText="Prioridade"
                        >
                        <MenuItem value={1} primaryText="Alta"/>
                        <MenuItem value={2} primaryText="Media"/>
                        <MenuItem value={3} primaryText="Baixa"/>
                        </SelectField>
                        
                        </MuiThemeProvider>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-2 col-form-label">Nome Tarefa</label>
                    <div className="col-10">
                        <textarea 
                            className="form-control"
                            id="exampleTextarea" 
                            placeholder="Descrição"
                            rows="1"
                            value={this.state.descricao}
                            onChange={this.salvaAlteracao.bind(this, 'descricao')}
                            required
                        >
                        </textarea>
                    </div>    
                </div>
              </form>
              
            </div>
        );
    }
}