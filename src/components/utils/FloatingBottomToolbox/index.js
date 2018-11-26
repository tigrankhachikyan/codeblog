import React from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './index.css';

export default function FloatingBottomToolbox(props) {
  return (
    <div className="floating-toolbox">
      {
        props.actions && props.actions.map((action, index) => {
          return (
            <div key={index} className="floating-toolbox-item">
              <ActionButton {...action} />
            </div>
          )
        })
      }
    </div>
  )
}

FloatingBottomToolbox.propTypes = {
  actions: PropTypes.array.isRequired
};

const ActionButton = (props) => {
  return (
    <a 
      title={props.title || ''}
      className="round-button" 
      onClick={props.action}
    >
      <FontAwesomeIcon icon={props.icon} />
    </a>
  )
}

ActionButton.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
};

