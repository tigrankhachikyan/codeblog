import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabel extends React.Component {
  state = {
    checkedA: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <FormGroup row>
        <FormControlLabel
          label="AutoSave"
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
              color="primary"
            />
          }
        />        
      </FormGroup>
    );
  }
}

export default SwitchLabel;
