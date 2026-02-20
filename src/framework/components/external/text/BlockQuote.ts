import { ATTR_CITE } from "../../../constants/Attributes";
import Component from "../Component";

export default class BlockQuote extends Component{
    
    constructor() {
        super("blockquote");
    }

    public cite(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CITE, attr);
    }
}
