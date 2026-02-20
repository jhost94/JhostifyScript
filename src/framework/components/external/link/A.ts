import { 
    ATTR_DOWNLOAD, 
    ATTR_HREF,
    ATTR_HREF_LANG,
    ATTR_MEDIA,
    ATTR_REL,
    ATTR_TARGET,
    ATTR_TYPE
} from "../../../constants/Attributes";
import Component from "../Component";

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

    public rel(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_REL, attr);
    }

    public target(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TARGET, attr);
    }

    public type(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TYPE, attr);
    }
}