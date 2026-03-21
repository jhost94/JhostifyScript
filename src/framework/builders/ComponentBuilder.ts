import NotImplementedException from "../exceptions/NotImplementedException.js";
import Component from "../components/external/Component.js";
import InternalComponent from "../components/internal/InternalComponent.js";
import { 
    EVENT_ON_ABORT, 
    EVENT_ON_AFTER_PRINT, 
    EVENT_ON_BEFORE_PRINT, 
    EVENT_ON_BEFORE_UNLOAD, 
    EVENT_ON_BLUR,
    EVENT_ON_CAN_PLAY,
    EVENT_ON_CAN_PLAY_THROUGH,
    EVENT_ON_CHANGE,
    EVENT_ON_CLICK,
    EVENT_ON_CONTEXT_MENU,
    EVENT_ON_COPY,
    EVENT_ON_CUE_CHANGE,
    EVENT_ON_CUT,
    EVENT_ON_DOUBLE_CLICK,
    EVENT_ON_DRAG,
    EVENT_ON_DRAG_END,
    EVENT_ON_DRAG_ENTER,
    EVENT_ON_DRAG_LEAVE,
    EVENT_ON_DRAG_OVER,
    EVENT_ON_DRAG_START,
    EVENT_ON_DROP,
    EVENT_ON_DURATION_CHANGE,
    EVENT_ON_EMPTIED,
    EVENT_ON_ENDED,
    EVENT_ON_ERROR,
    EVENT_ON_FOCUS,
    EVENT_ON_HASH_CHANGE,
    EVENT_ON_INPUT,
    EVENT_ON_INVALID,
    EVENT_ON_KEY_DOWN,
    EVENT_ON_KEY_PRESS,
    EVENT_ON_KEY_UP,
    EVENT_ON_LOAD,
    EVENT_ON_LOAD_START,
    EVENT_ON_LOADED_DATA,
    EVENT_ON_LOADED_METADA_DATA,
    EVENT_ON_MOUSE_DOWN,
    EVENT_ON_MOUSE_MOVE,
    EVENT_ON_MOUSE_OUT,
    EVENT_ON_MOUSE_OVER,
    EVENT_ON_MOUSE_UP,
    EVENT_ON_MOUSE_WHEEL,
    EVENT_ON_OFFLINE,
    EVENT_ON_ONLINE,
    EVENT_ON_PAGE_HIDE,
    EVENT_ON_PAGE_SHOW,
    EVENT_ON_PASTE,
    EVENT_ON_PAUSE,
    EVENT_ON_PLAY,
    EVENT_ON_PLAYING,
    EVENT_ON_POP_STATE,
    EVENT_ON_PROGRESS,
    EVENT_ON_RATE_CHANGE,
    EVENT_ON_RESET,
    EVENT_ON_RESIZE,
    EVENT_ON_SCROLL,
    EVENT_ON_SEARCH,
    EVENT_ON_SEEKED,
    EVENT_ON_SEEKING,
    EVENT_ON_SELECT,
    EVENT_ON_STALLED,
    EVENT_ON_STORAGE,
    EVENT_ON_SUBMIT,
    EVENT_ON_SUSPEND,
    EVENT_ON_TIME_UPDATE,
    EVENT_ON_TOGGLE,
    EVENT_ON_UNLOAD,
    EVENT_ON_VOLUME_CHANGE,
    EVENT_ON_WAITING,
    EVENT_ON_WHEEL
} from "../constants/OnEvents.js";
import ElementVendor from "../requirements/ElementVendor.js";

export default class ComponentBuilder {

    constructor(private elementBuilder: ElementVendor) {}

    public build(component: Component): InternalComponent {
        const element = component.build(this.elementBuilder.createElement(component.getName()));
        const components: InternalComponent[] = [];
        if (component.children() && component.children().length > 0) {
            components.push(...component.children().map(c => this.build(c)));
            components.forEach(c => component.css().concat(c.getCss()));
        }
        const content = component.content();
        const color = component.color();
        const backgroundColor = component.backgroundColor();
        const onEvents = component.getOnEvents();
        
        if (element instanceof HTMLElement) {
            const htmlElement = element as HTMLElement;
            if (content) htmlElement.innerText = content;
            if (color) htmlElement.style.color = color;
            if (backgroundColor) htmlElement.style.backgroundColor = backgroundColor;
            
            // TODO: move this to component build??
            onEvents.forEach((v, k) => {
                switch (k) {
                    case EVENT_ON_ABORT:
                        htmlElement.onabort = v;
                        break;
                    case EVENT_ON_AFTER_PRINT:
                        throw new NotImplementedException(k);
                    case EVENT_ON_BEFORE_PRINT:
                        throw new NotImplementedException(k);
                    case EVENT_ON_BEFORE_UNLOAD:
                        throw new NotImplementedException(k);
                    case EVENT_ON_BLUR:
                        htmlElement.onblur = v;
                        break;
                    case EVENT_ON_CAN_PLAY:
                        htmlElement.oncanplay = v;
                        break;
                    case EVENT_ON_CAN_PLAY_THROUGH:
                        htmlElement.oncanplaythrough = v;
                        break;
                    case EVENT_ON_CHANGE:
                        htmlElement.onchange = v;
                        break;
                    case EVENT_ON_CLICK:
                        htmlElement.onclick = v;
                        break;
                    case EVENT_ON_CONTEXT_MENU:
                        htmlElement.oncontextmenu = v;
                        break;
                    case EVENT_ON_COPY:
                        htmlElement.oncopy = v;
                        break;
                    case EVENT_ON_CUE_CHANGE:
                        htmlElement.oncuechange = v;
                        break;
                    case EVENT_ON_CUT:
                        htmlElement.oncut = v;
                        break;
                    case EVENT_ON_DOUBLE_CLICK:
                        htmlElement.ondblclick = v;
                        break;
                    case EVENT_ON_DRAG:
                        htmlElement.ondrag = v;
                        break;
                    case EVENT_ON_DRAG_END:
                        htmlElement.ondragend = v;
                        break;
                    case EVENT_ON_DRAG_ENTER:
                        htmlElement.ondragenter = v;
                        break;
                    case EVENT_ON_DRAG_LEAVE:
                        htmlElement.ondragleave = v;
                        break;
                    case EVENT_ON_DRAG_OVER:
                        htmlElement.ondragover = v;
                        break;
                    case EVENT_ON_DRAG_START:
                        htmlElement.ondragstart = v;
                        break;
                    case EVENT_ON_DROP:
                        htmlElement.ondrop = v;
                        break;
                    case EVENT_ON_DURATION_CHANGE:
                        htmlElement.ondurationchange = v;
                        break;
                    case EVENT_ON_EMPTIED:
                        htmlElement.onemptied = v;
                        break;
                    case EVENT_ON_ENDED:
                        htmlElement.onended = v;
                        break;
                    case EVENT_ON_ERROR:
                        htmlElement.onerror = v;
                        break;
                    case EVENT_ON_FOCUS:
                        htmlElement.onfocus = v;
                        break;
                    case EVENT_ON_HASH_CHANGE:
                        throw new NotImplementedException(k);
                    case EVENT_ON_INPUT:
                        htmlElement.oninput = v;
                        break;
                    case EVENT_ON_INVALID:
                        htmlElement.oninvalid = v;
                        break;
                    case EVENT_ON_KEY_DOWN:
                        htmlElement.onkeydown = v;
                        break;
                    case EVENT_ON_KEY_PRESS:
                        htmlElement.onkeypress = v;
                        break;
                    case EVENT_ON_KEY_UP:
                        htmlElement.onkeyup = v;
                        break;
                    case EVENT_ON_LOAD:
                        htmlElement.onload = v;
                        break;
                    case EVENT_ON_LOADED_DATA:
                        htmlElement.onloadeddata = v;
                        break;
                    case EVENT_ON_LOADED_METADA_DATA:
                        htmlElement.onloadedmetadata = v;
                        break;
                    case EVENT_ON_LOAD_START:
                        htmlElement.onloadstart = v;
                        break;
                    case EVENT_ON_MOUSE_DOWN:
                        htmlElement.onmousedown = v;
                        break;
                    case EVENT_ON_MOUSE_MOVE:
                        htmlElement.onmousemove = v;
                        break;
                    case EVENT_ON_MOUSE_OUT:
                        htmlElement.onmouseout = v;
                        break;
                    case EVENT_ON_MOUSE_OVER:
                        htmlElement.onmouseover = v;
                        break;
                    case EVENT_ON_MOUSE_UP:
                        htmlElement.onmouseup = v;
                        break;
                    case EVENT_ON_MOUSE_WHEEL:
                        throw new NotImplementedException(k);
                    case EVENT_ON_OFFLINE:
                        throw new NotImplementedException(k);
                    case EVENT_ON_ONLINE:
                        throw new NotImplementedException(k);
                    case EVENT_ON_PAGE_HIDE:
                        throw new NotImplementedException(k);
                    case EVENT_ON_PAGE_SHOW:
                        throw new NotImplementedException(k);
                    case EVENT_ON_PASTE:
                        htmlElement.onpaste = v;
                        break;
                    case EVENT_ON_PAUSE:
                        htmlElement.onpause = v;
                        break;
                    case EVENT_ON_PLAY:
                        htmlElement.onplay = v;
                        break;
                    case EVENT_ON_PLAYING:
                        htmlElement.onplaying = v;
                        break;
                    case EVENT_ON_POP_STATE:
                        throw new NotImplementedException(k);
                    case EVENT_ON_PROGRESS:
                        htmlElement.onprogress = v;
                        break;
                    case EVENT_ON_RATE_CHANGE:
                        htmlElement.onratechange = v;
                        break;
                    case EVENT_ON_RESET:
                        htmlElement.onreset = v;
                        break;
                    case EVENT_ON_RESIZE:
                        htmlElement.onresize = v;
                        break;
                    case EVENT_ON_SCROLL:
                        htmlElement.onscroll = v;
                        break;
                    case EVENT_ON_SEARCH:
                        throw new NotImplementedException(k);
                    case EVENT_ON_SEEKED:
                        htmlElement.onseeked = v;
                        break;
                    case EVENT_ON_SEEKING:
                        htmlElement.onseeking = v;
                        break;
                    case EVENT_ON_SELECT:
                        htmlElement.onselect = v;
                        break;
                    case EVENT_ON_STALLED:
                        htmlElement.onstalled = v;
                        break;
                    case EVENT_ON_STORAGE:
                        throw new NotImplementedException(k);
                    case EVENT_ON_SUBMIT:
                        htmlElement.onsubmit = v;
                        break;
                    case EVENT_ON_SUSPEND:
                        htmlElement.onsuspend = v;
                        break;
                    case EVENT_ON_TIME_UPDATE:
                        htmlElement.ontimeupdate = v;
                        break;
                    case EVENT_ON_TOGGLE:
                        htmlElement.ontoggle = v;
                        break;
                    case EVENT_ON_UNLOAD:
                        throw new NotImplementedException(k);
                    case EVENT_ON_VOLUME_CHANGE:
                        htmlElement.onvolumechange = v;
                        break;
                    case EVENT_ON_WAITING:
                        htmlElement.onwaiting = v;
                        break;
                    case EVENT_ON_WHEEL:
                        htmlElement.onwheel = v;
                        break;
                }
            });
        }
        return new InternalComponent(element, component.getName(), component.getId(), components, component.css());
    }
}
