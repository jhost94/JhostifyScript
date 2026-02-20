import { ATTR_DATE_TIME } from "../../../constants/Attributes";
import Component from "../Component";

export default class Time extends Component{
    
    constructor() {
        super("time");
    }

    public dateTime(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DATE_TIME, attr);
    }
}
