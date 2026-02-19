import Component, { ATTR_MEDIA } from "../Component";

export default class Source extends Component{
    
    constructor() {
        super("source");
    }

    public media(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MEDIA, attr);
    }
}