import React, { Component } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import PropTypes from 'prop-types';

import { BLACKLIST_CURRENT_ELEMENT_DESELECT, ElementTypes, MODES } from "../constants";
import { Tree } from 'antd';
import ComponentTreeNode from './componetTreeNode'
const TreeNode = Tree.TreeNode;

@observer
class ComponentTree extends Component {
  
  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }
  onSelect = (selectedKeys, info) => {
    const {eventKey} = info.node.props;
    this.context.store.setCurrentElement(eventKey);

  }
  renderChild = (id) => {

    const store = this.context.store;
    const isSelected = store.currentElement === id;
    const childObj = store.components.get(id);
    if(!childObj)return;
    return (
        <ComponentTreeNode dataRef={childObj}  index={childObj.id}  title={childObj.type}  key={childObj.id}>
           {childObj.children!=null && childObj.children.map(this.renderChild) }
        </ComponentTreeNode>
    );
  }

  render() {
     const {store:{components,rootID}} = this.context;
    if (!components) return null;
    const currentSlide = components.get(rootID);
    return (
        <Tree onSelect={this.onSelect} onDragEnter={(e)=>{alert(e)}}>
          <ComponentTreeNode dataRef={currentSlide}   title={currentSlide.type} index={currentSlide.id}  key={currentSlide.id}>
            {currentSlide && rootID && currentSlide.children.map(this.renderChild)}
          </ComponentTreeNode>
        </Tree>    
    
    );
  }
}

export default ComponentTree;
