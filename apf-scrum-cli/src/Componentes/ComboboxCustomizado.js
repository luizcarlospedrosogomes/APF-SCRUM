
import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  customWidth: {
    width: 250,
  },
};

export default  class ComboboxCustomizado extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render () {
    return (
      <div>
        <MuiThemeProvider>
          <SelectField value={1}
          value={this.state.value}
          onChange={this.handleChange}
          autoWidth={true}
           >
          <MenuItem value={1} primaryText="Scrum Master"/>
          <MenuItem value={2} primaryText="Product Owner"/>
          <MenuItem value={3} primaryText="Desenvolvedor"/>
        </SelectField>
        
        </MuiThemeProvider>
      </div>
    );
  }
}