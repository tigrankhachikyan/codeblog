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

FloatingBottomToolbox.propTypes = {
  actions: PropTypes.object.isRequired
};
