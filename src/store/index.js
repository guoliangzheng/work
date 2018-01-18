import { observable, computed, transaction, asReference,autorun } from "mobx";
import Immutable from "seamless-immutable";
import { merge, mergeWith, pick, omit } from "lodash";
import uuid from '../util/uuid'
import elementMap from "../canvas/elements";
import xml2js from'xml2js';
console.log(xml2js)

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
      window.memroy = this;

      if(slide){
        this.slide = slide;
      }else{
        let id = uuid();
        this.rootID = id;
        this.slide = Immutable.from( {
          parent:null,
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
    if(parent==null)  return ;
    //const slideToAddTo = this.currentSlide;
    const element = elementMap[elementType];
    const id = uuid();
    const mergedProps = merge(element.props, extraProps);
    const child= {
      ...element,
      parent:selectItemid,
      props: mergedProps,
      id: id,
      children:[]
    }
    parent.children.push(id);
    this.components.set(id,child);
    
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

  updateElementParent(props){


   /*  if(this.dropTagElementId==null) return;
    const currentElement = this.components.get(this.currentElement);
    if(currentElement==null) return;
    const currentID = this.currentElement;
    const oldParentID = currentElement.parent;
    if(!oldParentID) return;
    if(oldParentID==this.dropTagElementId){
      return ;
    }
    const oldParent = this.components.get(this.oldParentID);
    const newParent = this.components.get(this.dropTagElementId);

    newParent.children.push(this.currentElement);
    let tmep = []
    oldParent.children.map((id)=>{
        if(id!=currentID){
          tmep.push(id);
        }
      }
    );
    oldParent.children =tmep; */
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

  serialize(){
      this.toxml(this.rootID);
  }
  toxml(id){
    const obj = this.components.get(id)
    if(!obj) return ;
    var builder = new xml2js.Builder({cdata:true});
    var xml = builder.buildObject(obj);
    console.log(xml)
    const children = obj.children;
    if(children ==null) return ;
    for(let i =0,length = children.length;i<length;i++){
       this.toxml(children[i]);
    }
  }
}