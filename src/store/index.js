import { observable, computed, transaction, asReference,autorun } from "mobx";
import Immutable from "seamless-immutable";
import { merge, mergeWith, pick, omit } from "lodash";
import uuid from '../util/uuid'
import elementMap from "../canvas/elements";

export default class Store{
    @observable rootID = null;
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

    @observable currentElement = null;
    @observable mouseOverElement = null;

    @observable side = false;
    @observable components = null;
    @observable poprtyeChange =0;
    @observable dropTagElementId = null;
    @computed get currentSlide() {
      return this.slide;
    }
    constructor(slide) {

      if(slide){
        this.slide = slide;
      }else{
        let id = uuid();
        this.rootID = id;
        this.slide = Immutable.from( {
          id: id,
          props: { style: {}, transition: ["slide"] },
          children: []
         })
         this.components = new Map();
         this.components.set(id,this.slide);
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
    let selectItemid = this.dropTagElementId || this.rootID;

    const parent = this.components.get(selectItemid);
    //const slideToAddTo = this.currentSlide;
    const element = elementMap[elementType];
    const id = uuid();
    const mergedProps = merge(element.props, extraProps);
    const child= {
      ...element,
      props: mergedProps,
      id: id,
      children:[]
    }
    parent.children.push(child);
    this.components.set(id,child)
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
  setCurrentElement(id) {
      this.currentElement = id;
  }

  setMouserOverElement(id){
    this.mouseOverElement = id;
  }

  updateElementProps(props) {
      if(this.currentElement==null) return;
      const currentElement = this.components.get(this.currentElement);
      const newProps = merge(currentElement.props, props);
      currentElement.props =newProps;
      this.poprtyeChange = this.poprtyeChange^1;
  }

  @computed get getpoprtyeChange(){
    return this.poprtyeChange;
  }
  
  @computed get currentComponents(){
    const currentElement = this.components.get(this.currentElement);
    return currentElement;
  }
  setDropTagElement(id){
    this.dropTagElementId= id;
  }

  @computed get dropTagElement(){
    const currentElement = this.components.get(this.dropTagElementId);
    return currentElement;
  }


}