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
      flex:'',
      flexGrow:'',
      flexShrink:'',
      flexBasis:'',
      width:'', 
      minWidth:'',
      maxWidth:'', 
      height:'', 
      minHeight:'', 
      maxHeight:'',
      column:'',
      row:'', 
      wrap:'',
      inline:'', 
      center:'',
      fit:''
    }
  },
  children: []
};

export default elements;
