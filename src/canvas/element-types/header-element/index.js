import React from 'react'
import omit from 'lodash'
import { pick } from "lodash";
import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";
import PropTypes from 'prop-types';
export default class BoxElement extends React.PureComponent {
  static contextTypes = {
    store:PropTypes.object
  }
  static propTypes = {
    ...CanvasElementPropTypes,
    rect: PropTypes.object,
    component: PropTypes.shape({
      props: PropTypes.object
    })
  }
  componentDidMount(){
    document.addEventListener('mouseover',(e)=>{
        this.context.store.setDropTagElement(this.props.index)
        this.context.store.updateElementParent();
        e.stopPropagation();
      },false);
/*     document.addEventListener('mouseup',(e)=>{this.endDrag(e);},false);
 */  
  }
  getSize = () => ({
    width: this.props.component.props.style.width,
    height: this.props.component.props.style.height,
    left: this.props.component.props.style.left,
    top: this.props.component.props.style.top
  })

 
  render() {
    const componentProps = this.props.component.props;
    const style = componentProps.style;
    const width =  this.props.rect ? this.props.rect.width : style.width;
    const height = this.props.rect ? this.props.rect.height : style.height;
    const display = style.display;
    const position = style.position;
    const padding = style.padding;
    const background =style.background;
    return (
         
     
          <div  style={{width:width,height:height,background:background,border:'1px solid #F00', }}>{this.props.children}</div>
       
    )
  }
}

