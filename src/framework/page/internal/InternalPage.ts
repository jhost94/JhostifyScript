import { OnEventType } from "../../components/external/OnEvent";
import InternalComponent from "../../components/internal/InternalComponent";
import InternalCss from "../../components/internal/InternalCss";
import Css from "../../components/style/css/Css";

/**
 * This is going to be an internal only class, outside of the user's responsabilites, this is going to be created internally
 */
export default class InternalPage extends InternalComponent {
    constructor(
        element: Element, 
        name: string, 
        id: string, 
        private pageCss: InternalCss,
        components: InternalComponent[] = [], 
        css: Css, 
        onEvents: Map<OnEventType, (e: any) => void>,
        doOnRender: (() => void)[] = [],
        doBeforeRender: (() => void)[] = [],
        doAfterRender: (() => void)[] = [],
    ) {
        super(element, name, id, components, css, onEvents, doOnRender, doBeforeRender, doAfterRender);
    }

    public getPageCss(): InternalCss {
        return this.pageCss;
    }

}
