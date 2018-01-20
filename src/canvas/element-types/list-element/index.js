import React, { Component } from "react";
import { pick } from "lodash";
import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import { List } from 'antd';

@observer
export default class ListElement extends Component {
  static propTypes = {
    ...CanvasElementPropTypes,
    rect: PropTypes.object,
    component: PropTypes.shape({
      props: PropTypes.object
    })
  }

  getSize = () => ({
    width: this.props.component.props.style.width,
    height: this.props.component.props.style.height,
    left: this.props.component.props.style.left,
    top: this.props.component.props.style.top
  })

  render() {
    const componentProps = this.props.component.props;
    const width = this.props.rect ? this.props.rect.width : componentProps.style.width;
    const height = this.props.rect ? this.props.rect.height : componentProps.style.height;
     const data = componentProps.data;  
  
    return (
     
       <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<a onClick= {()=>{alert(item.key)}}>{item.value}</a>}
              description=""
            />
          </List.Item>
    )}
  />

   
    );
  }
}