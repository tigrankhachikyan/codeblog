import React from 'react';
import PropTypes from "prop-types";

import './index.css';

const Modal = (props) => {
  const showHideClassName = props.show
    ? "modal display-block" 
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {props.children}
      </section>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
};

export default Modal;