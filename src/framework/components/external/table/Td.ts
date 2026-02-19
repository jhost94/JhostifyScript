import Component, { 
    ATTR_COLSPAN, 
    ATTR_HEADERS 
} from "../Component";

export default class Td extends Component{
    
    constructor() {
        super("td");
    }

    public colspan(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_COLSPAN, attr);
    }

    public headers(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEADERS, attr);
    }
}