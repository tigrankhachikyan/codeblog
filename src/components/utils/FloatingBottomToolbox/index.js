import React from 'react';
import './index.css';

export default function FloatingBottomToolbox(props) {
  return (
    <div className="floating-toolbox">
      {
        props.actions && props.actions.map((action, index) => {
          return (
            <div key={index} className="floating-toolbox-item">
              {action}
            </div>
          )
        })
      }
    </div>
  )
}