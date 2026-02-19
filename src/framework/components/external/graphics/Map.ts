import Component, { ATTR_NAME } from "../Component";

export default class Map extends Component{
    
    constructor() {
        super("Map");
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }
}