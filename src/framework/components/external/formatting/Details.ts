import { ATTR_OPEN } from "../../../constants/Attributes";
import Component from "../Component";

export default class Details extends Component{
    
    constructor() {
        super("details");
    }

    public open(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_OPEN, attr);
    }
    
}