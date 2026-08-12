import { ATTR_SPAN } from "../../../../constants/Attributes";
import Component from "../../Component";

export default class ColGroup extends Component{
    
    constructor() {
        super("colgroup");
    }

    public span(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SPAN, attr);
    }
}