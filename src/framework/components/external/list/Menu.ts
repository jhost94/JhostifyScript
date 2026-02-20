import { ATTR_TYPE } from "src/framework/constants/Attributes";
import Component from "../Component";

export default class Menu extends Component{
    
    constructor() {
        super("menu");
    }

    public type(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TYPE, attr);
    }
}