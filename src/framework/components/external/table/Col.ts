import { ATTR_SPAN } from "src/framework/constants/Attributes";
import Component from "../Component";

export default class Col extends Component{
    
    constructor() {
        super("col");
    }

    public span(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SPAN, attr);
    }
}