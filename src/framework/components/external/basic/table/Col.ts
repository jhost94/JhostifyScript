import { ATTR_SPAN } from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Col extends Component{
    
    constructor(parent?: ID) {
        super("col", parent);
    }

    public span(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SPAN, attr);
    }
}