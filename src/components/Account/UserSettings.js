import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import './index.css';
import Switch from '@material-ui/core/Switch';

import {
  loadUserSettings,
  updateUserSettings,
  assignUserDefaultSettings
} from "../../actions/modules/userSettings";

class UserSettings extends PureComponent {
  render() {
    return (
      <div className = 'sittingConteiner'>
        <h2>User Settings</h2>
        <pre className = 'autoSaveText'>AutoSave</pre>
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