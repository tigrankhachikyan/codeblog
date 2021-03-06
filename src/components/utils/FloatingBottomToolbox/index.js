import React from 'react';
import PropTypes from "prop-types";
import Fab from '@material-ui/core/Fab';

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
    <Fab 
      variant={props.hint? "extended" : 'round'}
      color="primary"
      aria-label={props.title || ''}
      onClick={props.action}
    >
      {props.icon}
      {props.hint}
    </Fab>
  )
}

ActionButton.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func.isRequired,
  hint: PropTypes.string
//  icon: PropTypes.node // ??
};

