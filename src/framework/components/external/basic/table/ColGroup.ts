import { ATTR_SPAN } from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class ColGroup extends Component{
    
    constructor(parent?: ID) {
        super("colgroup", parent);
    }

    public span(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SPAN, attr);
    }
}