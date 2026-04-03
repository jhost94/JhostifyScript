import { EVENT_ON_TOGGLE } from "../../../../constants/OnEvents";
import { ATTR_OPEN } from "../../../../constants/Attributes";
import Component from "../../Component";

export default class Details extends Component{
    
    constructor() {
        super("details");
    }

    public open(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_OPEN, attr);
    }
    
    public onToggle(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_TOGGLE, action);
    }
}