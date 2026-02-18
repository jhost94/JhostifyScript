import Component, { ATTR_DATE_TIME } from "../Component";

export default class Time extends Component{
    
    constructor() {
        super("time");
    }

    public dateTime(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_DATE_TIME, attr);
        return this._attributes.get(ATTR_DATE_TIME);
    }
}
