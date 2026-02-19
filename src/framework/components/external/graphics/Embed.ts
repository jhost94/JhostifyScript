import Component, { ATTR_HEIGHT, ATTR_ON_ABORT } from "../Component";

export default class Embed extends Component{
    
    constructor() {
        super("embed");
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }
    
    public onAbort(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ON_ABORT, attr);
    }
}