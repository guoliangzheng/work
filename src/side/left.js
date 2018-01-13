
import React,{ Component } from "react";
import ElementList from '../element-list'
export default class LeftSide extends Component{

    render(){

        return (
            <div style={{
                display:'inline-block',
                float:'left'
            }}>
            <ElementList></ElementList>
            </div>
        )
    }


}

