import React from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";

import Toast from "./Toast";
import './index.css';

const Toasts = (props) => {
  const { removeToast } = props;
  return (
    <ul className="toasts">
      {props.toasts.map(toast => {
        const { id } = toast;
        return (
          <Toast {...toast} key={id} onDismissClick={() => removeToast(id)} />
        );
      })}
    </ul>
  );
};

const mapStateToProps = ({ toasts }) => {

  return { toasts: toasts.toasts };
};

export default connect(mapStateToProps, actions)(Toasts);
