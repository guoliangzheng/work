import TextElement from "./text-element";
import ImageElement from "./image-element";
import BoxElement from "./box-element";
import {ElementTypes } from "../../constants";
import LayoutElement from "./layout-element"
const elementFromType = new Map();

elementFromType.set(ElementTypes.TEXT,TextElement);
elementFromType.set(ElementTypes.IMAGE,ImageElement);
elementFromType.set(ElementTypes.BOX,BoxElement);
elementFromType.set(ElementTypes.LAYOUT,LayoutElement);

export default elementFromType