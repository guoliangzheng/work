import React, { Component } from "react";
import { pick } from "lodash";
import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import { List } from 'antd';
import { Form} from 'antd';
import FormDesginer from './form-desginer'
@observer
export default class FormElement extends Component {
  static propTypes = {
    ...CanvasElementPropTypes,
    rect: PropTypes.object,
    component: PropTypes.shape({
      props: PropTypes.object
    })
  }
  constructor(props){
    super(props);
    this.state={
      isedit:false
    }
  }
  getSize = () => ({
    width: this.props.component.props.style.width,
    height: this.props.component.props.style.height,
    left: this.props.component.props.style.left,
    top: this.props.component.props.style.top
  })
  openEditor=()=>{
    this.setState({isedit:true})
  }
  closeEditor=()=>{
    this.setState({isedit:false})
  }
  render() {
    const componentProps = this.props.component.props;
    const width = this.props.rect ? this.props.rect.width : componentProps.style.width;
    const height = this.props.rect ? this.props.rect.height : componentProps.style.height;
    const data = componentProps.data; 
    const layout = componentProps.layout;
    return (
      
         <Form onDoubleClick={this.openEditor} style={{width,height}} layout={layout} >
              {this.props.children}
              {this.state.isedit?<FormDesginer onClose={this.closeEditor} id={this.props.index}/>:''}
         </Form>
   
    );
  }
}