import React, { Component } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import PropTypes from 'prop-types';

import { BLACKLIST_CURRENT_ELEMENT_DESELECT, ElementTypes, MODES } from "../constants";

import styles from "./slide.css";
import * as constraints from "./constraints";
import SnapLines from "./snap-lines";
import elementFromType from "./element-types";

@observer
class Preview extends Component {
  static propTypes = {
  };

  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      snapLines: [],
      activeSnapLines: []
    };

    this.elementRefs = {};
  }


  


  renderChild = (id) => {

/*     const id = child.id;
 */ const store = this.context.store;
    const isSelected = store.currentElement === id;
    const childObj = store.components.get(id);
    if(!childObj) return;
    const Element = elementFromType.get(childObj.type);

    return (
        <Element
          component={childObj}      
        >
        {childObj.children!=null && childObj.children.map(this.renderChild) }
        </Element>
    );
  }

  render() {
     const {store:{components,rootID}} = this.context;
    if (!components) return null;
   
    const currentSlide = components.get(rootID);
    return (
      <div  style={{ ...currentSlide.props.style }} id="slide">
        {currentSlide && rootID && currentSlide.children.map(this.renderChild)}
      </div>
    );
  }
}

export default Preview;
