import { ATTR_HEIGHT, ATTR_WIDTH } from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Canvas extends Component{
    
    constructor(parent?: ID) {
        super("canvas", parent);
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }
    
    public width(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_WIDTH, attr);
    }
}