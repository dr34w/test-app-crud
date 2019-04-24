import React from "react";
import { withRouter } from "react-router-dom";
import './styles.css';

const Back = ({ history }) =>
  history.length > 1 && (
    <button onClick={history.goBack} className="buttonBg">Back</button>
  );

export default withRouter(Back);
