import Component, { 
    ATTR_DOWNLOAD, 
    ATTR_HREF, 
    ATTR_HREF_LANG,
    ATTR_MEDIA
} from "../Component";

export default class A extends Component{
    
    constructor() {
        super("a");
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