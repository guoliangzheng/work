import React, { Component } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import { findDOMNode } from "react-dom";

import { BLACKLIST_CURRENT_ELEMENT_DESELECT, ElementTypes, MODES } from "../constants";
import { Tree } from 'antd';
import { DropTarget } from 'react-dnd'

const TreeNode = Tree.TreeNode;
const boxTarget = {
	drop(props,monitor) {
    console.log("monitor",monitor)
    return { id: props.eventKey}
	},
}
@DropTarget("element-types", boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))
@observer
class ComponentTreeNode extends Component {
  
  static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
  }
   
  static contextTypes = {
    store: PropTypes.object
  };


  constructor(props, context) {
    super(props, context);
  }
 

  render() {
    const props =this.props;
    const { canDrop, isOver, connectDropTarget } = this.props
    return (
          <TreeNode  {...props} ref={instance => {
            if(!instance) return;
            console.log("instance",instance)
            const node = findDOMNode(instance);
            if(!node) return; 
            connectDropTarget(node);
          }} >
          {this.props.children}
          </TreeNode>
    
    );
  }
}

export default ComponentTreeNode;
