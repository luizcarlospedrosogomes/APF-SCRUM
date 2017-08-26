import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
    customWidth: {
      width: 150,
    },
  };

export default  class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {msg:''
                    , email:''
                    , senha:''
                    , tipo: 1
                }
     }
     
     salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = {};
        campoSendoAlterado[nomeInput] = evento.target.value;    
        this.setState(campoSendoAlterado);   
     }

      handleChange = (event, index, tipo) => this.setState({tipo}); 

      enviaForm(evento){
        evento.preventDefault();
        console.log(this.state.tipo)
         const requestInfo = {
            method:'POST',
            body:JSON.stringify({ email:this.state.email 
                                , tipo:this.state.tipo
                                , senha: this.state.senha
                            }),
            headers:{'Content-type'  : 'Application/json'}
        };

        fetch("http://scrum-php.herokuapp.com/v1/usuario",requestInfo)            
            .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                this.setState({msg:"Cadastro concluido com sucesso", cod:response.status});
                return response.text();
            }
            if(response.status === 400){
              this.setState({msg:"Verefique os campos.", cod:response.status});
              throw new Error('Verifique os campos');
            }
            else{
                this.setState({msg:"Entre em contato com o administrador.", cod:response.status});
                throw new Error('erro: '+ response.status+' nao foi possivel criar seu cadastro');
            }
        }).catch(error => {
            this.setState({msg:error.message});
        });
        
    }
    
    
      render(){
         return(
            <div>
                    <div className="panel panel-success">
                            <div className="panel-heading">
                                <div className="panel-title">Cadastro</div>
                            </div>
                            
                            <div className="panel-body">
                                <form className="form-group" onSubmit={this.enviaForm.bind(this)}>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" 
                                            className="form-control" 
                                            type="email" placeholder="Email" 
                                            required="true"
                                            value={this.state.email}
                                            onChange={this.salvaAlteracao.bind(this, 'email')}
                                    />
                                    
                                    {/* <label htmlFor="ftime">Função no time</label> */}
                                    
                                    <MuiThemeProvider>
                                    <SelectField floatingLabelText="Função no time" value={1}
                                    value={this.state.tipo}
                                    onChange={this.handleChange}
                                    autoWidth={true}
                                    style={styles.customWidth}
                                    >
                                    <MenuItem value={1} primaryText="Scrum Master"/>
                                    <MenuItem value={2} primaryText="Product Owner"/>
                                    <MenuItem value={3} primaryText="Desenvolvedor"/>
                                    </SelectField>
                                    
                                    </MuiThemeProvider>
                                    <br/>
                                    <label htmlFor="senha">Senha</label>
                                    <input id="senha" 
                                            className="form-control" 
                                            type="password" 
                                            placeholder="senha" 
                                            required="true"
                                            value={this.state.senha}
                                            onChange={this.salvaAlteracao.bind(this, 'senha')}
                                    />
                                    
                                    <label htmlFor="rsenha">Repita a senha</label>
                                    <input id="rsenha" 
                                            className="form-control" 
                                            type="password"  
                                            placeholder="Repita a senha" 
                                            required="true"
                                          
                                    />
                                    
                                    <button type="submit" className=" btn-fill btn-block btn btn-success     btn-lg">Cadastrar</button>                       
                                </form>

                            </div>
                        </div>
                    </div>
            
            );
    }
}