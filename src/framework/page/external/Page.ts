import Component from "../../components/external/Component.js";
import Random from "../../../utils/Random.js";
import Css from "../../components/style/css/Css.js";

class Page extends Component {

    constructor(name: string, private pageCss?: Css, id: string = Random.randomUUID()) {
        super(name, undefined, undefined, id);
        if (pageCss) {
            this.css(pageCss);
        }
    }

    public getCssParsed(): string {
        return this.css().getCss(true);
    }
    
}

export default Page;