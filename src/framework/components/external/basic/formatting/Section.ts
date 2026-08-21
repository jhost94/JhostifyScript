import Random from "../../../../../utils/Random";
import Component, { ComponentOptions } from "../../Component";

export default class Section extends Component{
    
    constructor(id: string = Random.randomUUID(), options?: ComponentOptions) {
        super("section", options, id);
    }
}