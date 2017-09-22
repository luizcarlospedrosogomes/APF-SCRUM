import React, { Component } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

 export default class Progress extends Component{
render (){
    if(!this.props.tipo){
        if(this.props.status === 'enviando'){
            return(
                <div>
                <MuiThemeProvider>
                    <LinearProgress mode="indeterminate" color='#8e44ad'/> 
                </MuiThemeProvider>
                </div>            
            )
        }
    }

    if(this.props.tipo === 'circular'){
        if(this.props.status === 'enviando'){
            return(
                <div className="container">
                    <div className="row justify-content-center">
                        <MuiThemeProvider>
                            <div className="col-4 align-self-center">
                                <CircularProgress mode="indeterminate" color='#27ae60'/> 
                            </div>
                        </MuiThemeProvider>
                    </div>            
                </div>
            )
        }
    }
    return(<div></div>)
  }
}



