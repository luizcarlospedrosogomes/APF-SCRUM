import { Component } from 'react';

export default  class Logout  extends Component{
    
    componentWillMount(){    
        localStorage.setItem('token', null);        
        this.props.history.push('/');
    }   

    render(){
         return null;
    }
}