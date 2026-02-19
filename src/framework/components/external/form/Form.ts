import Component, { ATTR_AUTO_COMPLETE, ATTR_NAME } from "../Component";

export default class Form extends Component{
    
    constructor() {
        super("form");
    }

    public acceptCharset(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ACCEPT_CHARSET, attr);
    }

    public action(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ACTION, attr);
    }

    public autoComplete(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_AUTO_COMPLETE, attr);
    }

    public encType(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ENC_TYPE, attr);
    }

    public method(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_METHOD, attr);
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }
    
    public noValidate(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NO_VALIDATE, attr);
    }
}


export const ATTR_ACCEPT_CHARSET: string = "accept-charset";
export const ATTR_ACTION: string = "action";
export const ATTR_ENC_TYPE: string = "enctype";
export const ATTR_METHOD: string = "method";
export const ATTR_NO_VALIDATE: string = "novalidate";
