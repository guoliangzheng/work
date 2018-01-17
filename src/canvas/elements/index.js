import React from "react";

import plotlyPlaceholder from "../../assets/images/plotly-placeholder.png";
import imagePlaceholder from "../../assets/icons/image.svg";
import { ElementTypes } from "../../constants";

const elements = {};
elements[ElementTypes.TEXT] = {
  type: ElementTypes.TEXT,
  defaultWidth: 52,
  defaultHeight: 36,
  defaultText: ["hello is me"],
  props: {
    isQuote: false,
    size: 4,
    listType: null,
    style: {
      wordBreak: "break-word",
      width: 200,
      height: 50,
      
    }
  },
  children: null
};
elements[ElementTypes.IMAGE] = {
  type: ElementTypes.IMAGE,
  props: {
    src: `http://jxdinfo.com//r/cms/www/default/images/hz9.jpg`,
    style: {
      width: 281,
      height: 200,
      opacity: 0.2
    }
  },
  children: []
};

elements[ElementTypes.BOX] = {
  type: ElementTypes.BOX,
  resizeVertical: true,
  props: {
    paragraphStyle: "Heading 1",
    isQuote: false,
    size: 4,
    listType: null,
    style: {
      position:'relative',
      padding: "1rem",
      width:100,
      background:" #FFF",
      height: 100,
      color: "#111"
    }
  },
  children: []
};
elements[ElementTypes.LAYOUT] = {
  type: ElementTypes.LAYOUT,
  resizeVertical: true,
  props: {
    style: {
      display: 'flex',
      flex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      flexDirection:'column',
    }
  },
  children: []
};

elements[ElementTypes.TABLE] = {
  type: ElementTypes.TABLE,
  resizeVertical: true,
  props: {
    style: {
      width: 400,
      height: 400,
      left: 0,
      top: 0
    },
    columns : [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }
    ],
    data : [{
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }]
  },
  children: []
};

export default elements;
