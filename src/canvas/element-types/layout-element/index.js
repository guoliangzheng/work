import React, { Component } from "react";
import { pick } from "lodash";
import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";
import PropTypes from 'prop-types';

export default class LayoutElement extends Component {
  static propTypes = {
    ...CanvasElementPropTypes,
    rect: PropTypes.object,
    component: PropTypes.shape({
      props: PropTypes.object
    })
  }    
  static contextTypes = {
    store:PropTypes.object
  }
  getSize = () => ({
    width: this.props.component.props.style.width,
    height: this.props.component.props.style.height,
    left: this.props.component.props.style.left,
    top: this.props.component.props.style.top
  })
  componentDidMount(){
    document.addEventListener('mouseover',(e)=>{
        this.context.store.setDropTagElement(this.props.key)
      },false);
/*     document.addEventListener('mouseup',(e)=>{this.endDrag(e);},false);
 */  
  }
  render() {
    const componentProps = this.props.component.props;
    const style =componentProps.style;
    console.log('hello');
    console.log(style)
    let display = style.display;
    let flex = style.flex;
    let position = style.position;
    let  left = style.left;
    let right = style.right;
    let top = style.top;
    let bottom = style.bottom;
    let flexDirection =style.flexDirection;
    
    return (
      
      <div 
      key={this.props.key}
    
      onMouseDown={this.props.mouseDownAction}
      onDragOver={this.props.dragOverAction}
      style={{top:this.props.postions.top,left:this.props.postions.left}}
      >
       <CanvasElement style={{ display: display,
        flex: flex,
        position: position,
        left: left,
        right: right,
        top: top,
        bottom: bottom}}
        {...pick(this.props, Object.keys(CanvasElementPropTypes))}
        getSize={this.getSize}
    > 
        <div style={{ display: display,
            flex: flex,
            position: position,
            left: 0,
            right: right,
            width:'100%',
            height:'100%',
            top: 0,
            borderColor:'#0000FF',
            border: '2px solid' ,
            bottom: bottom}}>hello is me</div>
       </CanvasElement> 

      </div>
    );
  }
}