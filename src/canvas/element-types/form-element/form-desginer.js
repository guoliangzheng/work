import React, { Component } from "react";
import { pick } from "lodash";
import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import { Modal, Button } from 'antd';

@observer
export default class FormDesginer extends Component {
  
  render() {

    return (
      <div>

         
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
      </div>       
    );
  }
}