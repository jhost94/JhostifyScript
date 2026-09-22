import { ATTR_TYPE } from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Menu extends Component{
    
    constructor(parent?: ID) {
        super("menu", parent);
    }

    public type(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TYPE, attr);
    }
}