import { ATTR_SPAN } from "../../../../constants/Attributes";
import Component from "../../Component";

export default class Col extends Component{
    
    constructor(parent?: Component) {
        super("col", parent);
    }

    public span(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SPAN, attr);
    }
}