import React, { Component } from 'react';

export default  class TipoContagem extends Component{
    constructor(props) {
        super(props);
        this.state = {lista : [], msg: '', total:''};    
    }  
    
    componentWillMount(){
        this.getContagem();
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
     
        if(this.state.lista ===''){
            return(<div></div>);
        }else{

         return(
            
            <div className="col-md-4 no-gutters">
                <div className="card col-md-11 no-gutters">
                    <div className="card-block col-md-3 no-gutters">
                            <h5 className="text-center">{this.props.tipoContagem}</h5>
                            <table className="table col-4">
                                <thead>
                                <tr>
                                    <th>TR</th>
                                    <th>TD</th>
                                    <th>Complexidade</th>
                                    <th>X</th>
                                    
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.lista.map((ponto, index) =>
                                        <tr key={index}>
                                            <td>{ponto.tr}</td>
                                            <td>{ponto.td}</td>
                                            <td>{ponto[0].complexidade}</td>
                                            <td>X{ponto[0].ponto}</td>
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
           );
        }
    }
}