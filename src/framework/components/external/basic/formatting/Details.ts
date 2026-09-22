import { EVENT_ON_TOGGLE } from "../../../../constants/OnEvents";
import { ATTR_OPEN } from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Details extends Component{
    
    constructor(parent?: ID) {
        super("details", parent);
    }

    public open(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_OPEN, attr);
    }
    
    public onToggle(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_TOGGLE, action);
    }
}