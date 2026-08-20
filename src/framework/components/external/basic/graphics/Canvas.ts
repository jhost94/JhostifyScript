import { ATTR_HEIGHT, ATTR_WIDTH } from "../../../../constants/Attributes";
import Component from "../../Component";

export default class Canvas extends Component{
    
    constructor() {
        super("canvas");
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }
    
    public width(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_WIDTH, attr);
    }
}