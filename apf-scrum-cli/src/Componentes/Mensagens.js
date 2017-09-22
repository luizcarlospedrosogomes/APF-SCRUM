import React, { Component } from 'react';
//import TimerMixin from 'react-timer-mixin';

export default  class Mensagens extends Component{
    
    constructor(props) {
        super(props);
        this.state = {cod:''};
    }
    
    
    render(){
        if(this.props.cod === 500)
            return(<div><span className="badge badge-danger">Entre em contato com o administrador.</span></div>)
        if(this.props.cod === 404)
            return(<div><span className="badge badge-pill badge-warning">Não encontrado</span></div>)
        if(this.props.cod === 401)
            return(<div><span className="badge badge-danger">Não autorizado</span></div>)
        if(this.props.cod === 400)
            return(<div><span className="badge badge-pill badge-warning">Verifique os dados</span></div>)
        if(this.props.cod === 200 || this.props.cod === 201)
            return(<div><span className="badge badge-pill badge-success">Operação realizada com sucesso</span></div>)
         return(<div></div>
        );
    }
}