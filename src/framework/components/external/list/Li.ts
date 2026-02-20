import { ATTR_VALUE } from "../../../constants/Attributes";
import Component from "../Component";

export default class Li extends Component{
    
    constructor() {
        super("li");
    }

    public value(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_VALUE, attr);
    }
}