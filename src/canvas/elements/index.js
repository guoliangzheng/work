import React from "react";

import plotlyPlaceholder from "../../assets/images/plotly-placeholder.png";
import imagePlaceholder from "../../assets/icons/image.svg";
import { ElementTypes } from "../../constants";

const elements = {};


elements[ElementTypes.TEXT] = {
  type: ElementTypes.TEXT,
  defaultWidth: 52,
  defaultHeight: 36,
  defaultText: ["Text"],
  resizeVertical: false,
  props: {
    paragraphStyle: "Heading 1",
    isQuote: false,
    size: 4,
    listType: null,
    style: {
      wordBreak: "break-word"
    }

  },
  children: null
};

elements[ElementTypes.IMAGE] = {
  type: ElementTypes.IMAGE,
  props: {
    src: `data:image/svg+xml;utf8,${imagePlaceholder}`,
    style: {
      width: 281,
      height: 200,
      opacity: 0.2
    }
  },
  children: []
};

elements[ElementTypes.PLOTLY] = {
  type: ElementTypes.PLOTLY,
  props: {
    src: "https://plot.ly/~rgerstenberger/0.embed?link=false",
    frameBorder: 0,
    scrolling: "no",
    style: {
      width: 450,
      height: 400
    }

  },
  children: []
};

elements[ElementTypes.PLOTY_PLACEHOLDER_IMAGE] = {
  // Values calculated at scale: 1
  type: ElementTypes.PLOTY_PLACEHOLDER_IMAGE,
  ComponentClass: Image,
  props: {
    src: plotlyPlaceholder,
    style: {
      width: 450,
      height: 400
    }
  },
  children: []
};


elements[ElementTypes.CODE] = {
  type: ElementTypes.CODE,
  defaultText: "Code",
  props: {
    language: "javascript",
    theme: "tomorrowNight",
    style: {
      margin: 0,
      textAlign: "left",
      width: 400,
      fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
      height: 200,
      fontSize: 13
    }
  },
  children: []
};

export default elements;
