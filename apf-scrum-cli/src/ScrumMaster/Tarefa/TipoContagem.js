import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import PubSub from 'pubsub-js';
import RemoverContagem from './RemoverContagem';


export default  class TipoContagem extends Component{
    constructor(props) {
        super(props);
        this.state = {lista : [], msg: '', total:''};    
    }  
    
    componentWillMount(){
        this.getContagem();
        PubSub.subscribe('removerContagem', function(topico){
            this.getContagem();
        }.bind(this)); 
        PubSub.subscribe('CriarContagem', function(topico){
            this.getContagem();
        }.bind(this)); 
    }

    getContagem(){
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers: new Headers({'X-token': localStorage.getItem('token')})
        }; 
        fetch("http://scrum-php.herokuapp.com/v1/scrummaster/contagem/"+this.props.tipoContagem+"/"+parseInt(this.props.IDTarefa, 10),requestInfo)            
        .then(response =>{
            if(response.status === 200 ||  response.status === 201){
                this.setState({cod:response.status, status:""});
                return response.json();
            }
            if(response.status === 404 ){
                this.setState({msg:"dados não encontrado", cod:response.status});
            }
        })
        .then(pontos =>{
            console.log(pontos.dados)
            this.setState({lista:pontos.dados, total: pontos.pontos });
        })
    }
    
    render(){
     
        if(this.state.lista ==''){
            return(<div></div>);
        }else{

         return(
            <MuiThemeProvider>
            <div className="col-md-4 no-gutters">
                <div className="card col-md-11 no-gutters">
                    <div className="card-block col-md-3 no-gutters">
                            <h5 className="text-center">{this.props.tipoContagem}</h5>
                            <table className="table col-4 no-gutters">
                                <thead>
                                <tr className="no-gutters">
                                    <th>TR</th>
                                    <th>TD</th>
                                    <th>Complex</th>
                                    <th>X</th>
                                    <th><ActionDelete/></th>
                                </tr>
                                </thead>
                                <tbody className="no-gutters">
                                    {this.state.lista.map((ponto, index) =>
                                        <tr key={index}>
                                            <td className="no-gutters">{ponto.tr}</td>
                                            <td className="no-gutters">{ponto.td}</td>
                                            <td className="no-gutters">{ponto[0].complexidade}</td>
                                            <td className="no-gutters"> X{ponto[0].ponto}</td>
                                            <td className="no-gutters">
                                                <RemoverContagem
                                                    IDContagem = {ponto.id}
                                                    TRContagem = {ponto.tr}
                                                    TDContagem = {ponto.td}
                                                    Complexidade = {ponto[0].complexidade}
                                                    ponto = {ponto[0].ponto}
                                                    tipoContagem = {this.props.tipoContagem}
                                                />
                                            </td>
                                        </tr>
                                      )}

                                    <tr>
                                        <td scope="row">Total</td>
                                        <td colSpan="3" className="text-right">{this.state.total}</td>                                    
                                    </tr>
                                 </tbody>
                            </table>
                        </div>
                    </div>
                    <br/>
              </div>
              </MuiThemeProvider>
           );
        }
    }
}