import Component, { 
    ATTR_ALT, 
    ATTR_DOWNLOAD, 
    ATTR_HREF,
    ATTR_HREF_LANG,
    ATTR_MEDIA
} from "../Component";

export default class Area extends Component{
    
    constructor() {
        super("area");
    }

    public alt(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ALT, attr);
    }

    public coords(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_COORDS, attr);
    }

    public download(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DOWNLOAD, attr);
    }

    public href(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HREF, attr);
    }

    public hrefLang(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HREF_LANG, attr);
    }

    public media(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MEDIA, attr);
    }
}

export const ATTR_COORDS: string = "coords";