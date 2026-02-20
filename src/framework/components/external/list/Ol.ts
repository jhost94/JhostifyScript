import { 
    ATTR_REVERSED, 
    ATTR_START 
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Ol extends Component{
    
    constructor() {
        super("ol");
    }

    public reversed(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_REVERSED, attr);
    }

    public start(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_START, attr);
    }
}