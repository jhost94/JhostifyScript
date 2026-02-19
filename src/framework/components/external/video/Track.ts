import Component, { ATTR_LABEL } from "../Component";

export default class Track extends Component{
    
    constructor() {
        super("track");
    }

    public default(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DEFAULT, attr);
    }
    
    public kind(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_KIND, attr);
    }

    public label(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LABEL, attr);
    }
}

export const ATTR_DEFAULT: string = "default";
export const ATTR_KIND: string = "kind";