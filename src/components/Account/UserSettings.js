import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import {
  loadUserSettings,
  updateUserSettings,
  assignUserDefaultSettings
} from "../../actions/modules/userSettings";

class UserSettings extends PureComponent {
  constructor(props){
    super(props);
    this.loadUserSettings();
  }

  loadUserSettings = async () => {
    const { auth } = this.props;
    try {
      await this.props.loadUserSettings(auth.uid);
    } catch {
      await this.props.assignUserDefaultSettings(auth, {
        USER_NAME: auth.email.replace(/\@.*$/, '')
      })
    }

  }

  render() {
    return (
      <div>
        <h2>User Settings</h2>
        <pre>
          {JSON.stringify(this.props.settings, null, 2)}
        </pre>
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