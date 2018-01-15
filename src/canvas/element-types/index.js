import TextElement from "./text-element";
import ImageElement from "./image-element";
import PlotlyElement from "./plotly-element";
import {ElementTypes } from "../../constants";

const elementFromType = new Map();

elementFromType.set(ElementTypes.TEXT,TextElement);
elementFromType.set(ElementTypes.IMAGE,ImageElement);
elementFromType.set(ElementTypes.PLOTLY,PlotlyElement);

export default elementFromType