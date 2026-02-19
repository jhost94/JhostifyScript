import Component, { ATTR_HEIGHT } from "../Component";

export default class Canvas extends Component{
    
    constructor() {
        super("canvas");
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }
}