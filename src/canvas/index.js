import React, { Component} from "react";
import { findDOMNode } from "react-dom";
import { observer } from "mobx-react";

import styles from "./index.css";
import PropTypes, { element } from 'prop-types';
import ElementList from '../element-list';
import { ElementTypes, MODES } from "../constants";
import ComponentTree from './componentTree'
/* import Elements from "../elements";
 */
import SnapLines from "./snap-lines";
import * as constraints from "./constraints";
import Slide from "./slide";
import PropertyEditor  from './property-editor'

import Preview from './preview'
import preview from "./preview";

@observer
class Canvas extends Component  {
     static contextTypes = {
        store: PropTypes.object
      }; 
    
      constructor(props) {
        super(props);
        this.state = { };
      }
     componentDidMount() {
        this.resize();
    
        window.addEventListener("load", this.resize);
        window.addEventListener("resize", this.resize);
      }
      componentWillUnmount() {
        window.removeEventListener("load", this.resize);
        window.removeEventListener("resize", this.resize);
      }
      getDefaultPosition = (type) => {
        const slideElement = findDOMNode(this.slideRef);
        const { width, height } = this.getDefaultSize(type);
        let left = (slideElement.clientWidth / 2) - (width / 2);
        let top = (slideElement.clientHeight / 2) - (height / 2);
        const { currentSlide } = this.context.store;
        const positions = currentSlide.children.reduce((positionHashMap, child) => {
          const key = `${child.props.style.left}x${child.props.style.top}`;
          positionHashMap[key] = true; // eslint-disable-line no-param-reassign
          return positionHashMap;
        }, {});
    
        while (positions[`${left}x${top}`]) {
          left += 10;
          top += 10;
        }
    
        return { left, top };
      }
    
      getDefaultSize = (type) => {

        const width=12;
        const height = 12;
       /*  const element = Elements[type];
        const height = element.defaultHeight || element.props.style.height;
        const width = element.defaultWidth || element.props.style.width; */
        return { width, height };
      } 
      // Keep a 4:3 ratio with the inner element centered, 30px padding
      resize = () => {
        const { offsetWidth, offsetHeight } = findDOMNode(this.refs.container);
        const width = offsetWidth;
        const height = offsetHeight;
    
        // TODO: need better logic for handling scale and content scale
        const shouldScale = offsetWidth < 1000 || offsetHeight < 700;
    
        const xScale = offsetWidth < 1000 ? offsetWidth / 1000 : 1;
        const yScale = offsetHeight < 700 ? offsetHeight / 700 : 1;
    
        this.scale = shouldScale ? Math.min(xScale, yScale) : 1;
    
        const scaleXOffset = width - (1000 * this.scale);
        const scaleYOffset = height - (700 * this.scale);
    
        const left = Math.floor(scaleXOffset / 2);
        const top = Math.floor(scaleYOffset / 2);
    
        this.context.store.setCanvasSize({
          width: 1000 * this.scale,
          height: 700 * this.scale,
          left,
          top,
          scale: this.scale
        });
      }
    
      handleDragStart = (e, type) => {
       
      }
    
      handleDrag = (e) => {
       
      }
    
      handleDragStop = () => {
        
      }
    
      handleDrop = (type,id) => {
        this.context.store.dropElement(type, id,{
          style: {
          }
        }); 
      } 
      elementFromType = (type) => {
        return null;
      }
      render(){
        const {
          isDraggingElement,
          isDraggingSlide,
          scale,
          top,
          left
         } = this.context.store;   
         return (
          <div 
            className={styles.canvasWrapper}
            style={{
             
              cursor: isDraggingElement ? "move" : "auto",
              pointerEvents: isDraggingSlide ? "none" : "auto"
            }}
          >
           
        <div  style={{float:'left', display:'inline-block',width:200}}>
        <ElementList 
/*           scale={scale}
 */          onDragStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onDragStop={this.handleDragStop}
          onDrop={this.handleDrop} 
        />
        </div>
        <div>
          <ComponentTree></ComponentTree>
        </div>
        <div
            style={{
              width: 1000, 
              height: 700,
              cursor: isDraggingElement ? "move" : "auto",
              pointerEvents: isDraggingSlide ? "none" : "auto"
            }}
          >
          <div className={styles.canvas} style={{float:'left',display:'inline-block',}} id="canvas" ref="container">
              <div
                style={{
                  transformOrigin: "top left",
                  transform: `scale(${scale})`,
                  width: 1000, 
                  height: 700,
                  top,
                  left,
                  backgroundColor: "#999"
                }}
              >  
              <Preview/>  
              </div>
            </div>
           </div>
           <PropertyEditor/>
          </div>
        );
      }

}
export default  Canvas 