import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import './index.css';
import SwitchLabel from './Switch';

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
      userName: 'User'
    }
  }

  render() {
    return (
      <div className = 'sittingConteiner'>
        {/* <div className = 'sittingDiv'> */}
            <h2>User Settings</h2>
        {/* </div> */}
        <div className = 'hr'></div>
        
        <div className='switchStyle'>
        <SwitchLabel/>
        </div>
        <input 
            type="number" 
            placeholder='Seconds'
            className='SecondsInput'
            onChange={e => this.setState({seconds: e.target.value * 1000 })}
      />
      <button className='userButton'> 
          {this.state.userName}
      </button>

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