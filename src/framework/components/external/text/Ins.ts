import Component, { 
    ATTR_CITE, 
    ATTR_DATE_TIME
} from "../Component";

export default class Ins extends Component{
    
    constructor() {
        super("ins");
    }

    public cite(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_CITE, attr);
        return this._attributes.get(ATTR_CITE);
    }

    public dateTime(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_DATE_TIME, attr);
        return this._attributes.get(ATTR_DATE_TIME);
    }
}
