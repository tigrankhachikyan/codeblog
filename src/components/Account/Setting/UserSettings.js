import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import './index.css';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {
  loadUserSettings,
  updateUserSettings,
  assignUserDefaultSettings
} from "../../../actions/modules/userSettings";

class UserSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      seconds: null,
      userName: 'User',
      checkedA: true,
      disabled: false
  
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked,
                    disabled: ! this.state.disabled
     });

  };

  

  render() {
    return (
      <div className = 'sittingConteiner'>
            <h2>User Settings</h2>
        <div className = 'hr'></div>
        
        <div className='switchStyle'>
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
        </div>
        <p className='titleAutosave'> AutoSave Interval </p>
        <input 
            type="number" 
            placeholder='Seconds'
            className='SecondsInput'
            onChange={e => this.setState({seconds: e.target.value * 1000 })}
            disabled={this.state.disabled}
      />
        <p className='title'> Your username </p>
            <input
              className ='userName'
              type='text'
              value={this.state.userName}
              onChange={e => this.setState({userName: e.target.value})}
            />


      <button className='saveSetting'>
        Save
      </button>
        {/* <pre className = 'autoSaveText'>AutoSave: </pre> */}
        {/* <pre>
          {JSON.stringify(this.props.settings, null , 2)}
        </pre> */}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, settings }) => {
  return {
    auth,
    settings
  };
};

export default connect(mapStateToProps, {
  loadUserSettings, 
  updateUserSettings, 
  assignUserDefaultSettings
})(UserSettings);
