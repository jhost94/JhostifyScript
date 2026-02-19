import Component, { ATTR_MAX } from "../Component";

export default class Progress extends Component{
    
    constructor() {
        super("progress");
    }

    public max(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MAX, attr);
    }
}