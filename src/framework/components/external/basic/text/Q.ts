import { ATTR_CITE } from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Q extends Component{
    
    constructor(parent?: ID) {
        super("q", parent);
    }

    public cite(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CITE, attr);
    }
}
