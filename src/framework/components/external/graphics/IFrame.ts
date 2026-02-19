import Component, { 
    ATTR_HEIGHT, 
    ATTR_NAME 
} from "../Component";

export default class IFrame extends Component{
    
    constructor() {
        super("iframe");
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }
}