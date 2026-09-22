import { ATTR_DATE_TIME } from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Time extends Component{
    
    constructor(parent?: ID) {
        super("time", parent);
    }

    public dateTime(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DATE_TIME, attr);
    }
}
