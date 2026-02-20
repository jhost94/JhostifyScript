import { ATTR_CITE } from "../../../constants/Attributes";
import Component from "../Component";

export default class Q extends Component{
    
    constructor() {
        super("q");
    }

    public cite(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CITE, attr);
    }
}
