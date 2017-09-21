import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tarefa from './Tarefa';
import PubSub from 'pubsub-js';

export default  class ListarTarefas extends Component{
    handleActive(tab) {
        if(tab.props['label'] === 'Fazendo')
            PubSub.publish("Fazendo"); 
        if(tab.props['label'] === 'À Fazer')
            PubSub.publish("AFazer"); 
        if(tab.props['label'] === 'Feito')
            PubSub.publish("Feito"); 
      }
      
    render(){
         return(
            <div>
                <MuiThemeProvider>
                <Tabs >
                    <Tab label="À Fazer" onActive={this.handleActive} >
                    <div><Tarefa status="AFazer"/></div>
                    </Tab>
                    <Tab label="Fazendo" onActive={this.handleActive}>
                    <div><Tarefa status="Fazendo"  /></div>
                    </Tab>
                    <Tab label="Feito" onActive={this.handleActive} >
                    <div><Tarefa status="Feito"/></div>
                    </Tab>
                </Tabs>
                </MuiThemeProvider>
            </div>
        );
    }
}