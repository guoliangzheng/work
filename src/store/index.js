import { observable, computed, transaction, asReference } from "mobx";
import Immutable from "seamless-immutable";
import { merge, mergeWith, pick, omit } from "lodash";
import { generate } from "shortid";
import elementMap from "../canvas/elements";

export default class Store{
    @observable width = 0;
    @observable height = 0;
    @observable left = 0;
    @observable top = 0;
    @observable scale = 1;

    @observable isDragging = false;
    @observable cursorType = null;
    @observable isResizing = false;
    @observable isDraggingSlide = false;
    @observable isDraggingElement = false;
    @observable isDraggingNewElement = false;

    @observable side = false;;
    @computed get currentSlide() {
      return this.side;
    }
    constructor(side) {

      if(side){
        this.side = side;
      }else{
        this.side = Immutable.from( {
          id: generate(),
          props: { style: {}, transition: ["slide"] },
          children: []
       })
      }

   
    }
  setCanvasSize({ width, height, left, top, scale }) {
    transaction(() => {
      this.width = width;
      this.height = height;
      this.left = left;
      this.top = top;
      this.scale = scale;
    });
  }

  updateElementDraggingState(isDraggingElement, isDraggingNewElement = false) {
    transaction(() => {
      this.isDragging = isDraggingElement;
      this.isDraggingElement = isDraggingElement;
      this.isDraggingNewElement = isDraggingNewElement;
    });
  }

  dropElement(elementType, extraProps) {
    const slideToAddTo = this.currentSlide;

    const element = elementMap[elementType];
     const mergedProps = merge(element.props, extraProps);

    slideToAddTo.children.push({
      ...element,
      props: mergedProps,
      id: generate()
    });

    console.log(slideToAddTo);
  }
  
  updateElementResizeState(isResizingElement, cursor = null) {
    transaction(() => {
      this.cursorType = cursor;
      this.isResizing = isResizingElement;
    });
  }

  updateSlideDraggingState(isDraggingSlide) {
    transaction(() => {
      this.isDragging = isDraggingSlide;
      this.isDraggingSlide = isDraggingSlide;
    });
  }
  setCurrentElementIndex(newIndex) {
   /*  const snapshot = this.currentState;
    snapshot.currentElementIndex = newIndex;

    transaction(() => {
      const left = this.history.slice(0, this.historyIndex);
      const right = this.history.slice(this.historyIndex + 1, this.history.length);
    //  this.history = left.concat([snapshot], right);
    }); */
  }

  updateElementProps(props, currentElementIndex) {
    
    const slide = this.currentSlide;
    const currentElement = slide.children[slide]
    if (!currentElement) {
      return;
    }
    const { paragraphStyle } = currentElement.props;
    const newProps = merge(currentElement.props, props);
    const newState = this.currentState;

    if (
      paragraphStyle !== props.paragraphStyle &&
      props.style &&
      !Object.keys(props.style).length
    ) {
      // if paragraph style changes, remove all added styles, but not any other ones affecting
      // position and word wrap
      newProps.style = omit(newProps.style, Object.keys(newState.paragraphStyles[paragraphStyle]));
    }

    newState.slide.children[currentElementIndex].props = newProps;
   /*  const elementIndex = typeof currentElementIndex === "number" ?
      currentElementIndex
      :
      this.currentElementIndex;

    const currentElement = this.slides[slideIndex].children[elementIndex] || this.currentElement;

    if (!currentElement) {
      return;
    }

    const { paragraphStyle } = currentElement.props;
    const newProps = merge(currentElement.props, props);
    const newState = this.currentState;

    if (
      paragraphStyle !== props.paragraphStyle &&
      props.style &&
      !Object.keys(props.style).length
    ) {
      // if paragraph style changes, remove all added styles, but not any other ones affecting
      // position and word wrap
      newProps.style = omit(newProps.style, Object.keys(newState.paragraphStyles[paragraphStyle]));
    }

    newState.slides[slideIndex].children[elementIndex].props = newProps; */
  }



}