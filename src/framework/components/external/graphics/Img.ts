import Component, { 
    ATTR_ALT, 
    ATTR_HEIGHT, 
    ATTR_ON_ABORT
} from "../Component";

export default class Img extends Component{
    
    constructor() {
        super("img");
    }

    public alt(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ALT, attr);
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }

    public ismap(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_IS_MAP, attr);
    }

    public onAbort(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ON_ABORT, attr);
    }
}

export const ATTR_IS_MAP: string = "ismap";