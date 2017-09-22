import React, { Component } from 'react';
export default  class FormatarData extends Component{
    
    formataData =() =>{
        
            var data = new Date(this.props.data);
            var dia = data.getDate();
            if (dia.toString().length == 1)
              dia = "0"+dia;
            var mes = data.getMonth()+1;
            if (mes.toString().length == 1)
              mes = "0"+mes;
            var ano = data.getFullYear();  
            return dia+"/"+mes+"/"+ano;
    }

    render(){
         return(
            <div>{this.formataData()}</div>
        );
    }
}