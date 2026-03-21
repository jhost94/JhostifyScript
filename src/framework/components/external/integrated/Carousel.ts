import Div from "../basic/formatting/Div";
import Span from "../basic/formatting/Span";
import Component from "../Component";
import Css from "../Css";

export default class Carousel extends Component {
    public static readonly CAROUSEL_CSS_CLASS: string = "jhostify-carousel";
    public static readonly CAROUSEL_TRACK_CSS_CLASS: string = "jhostify-carousel-track";
    public static readonly CAROUSEL_DOTS_CSS_CLASS: string = "jhostify-carousel-dots";
    public static readonly CAROUSEL_ARROW_CSS_CLASS: string = "jhostify-carousel-arrow";
    public static readonly CAROUSEL_LEFT_CSS_CLASS: string = "jhostify-carousel-left";
    public static readonly CAROUSEL_RIGHT_CSS_CLASS: string = "jhostify-carousel-right";
    public static readonly CAROUSEL_SLIDE_CSS_CLASS: string = "jhostify-carousel-slide"
    public static readonly CAROUSEL_ACTIVE_CSS_CLASS: string = "jhostify-carousel-active"

    private controller: CarouselControler;

    constructor(items: CarouselItem[] = []) {
        super("div");

        this.cssClass(this.carouselCssClass());
        const components = this.createItemsDots(items);
        
        const track = new Div();
        const arrowL = new Div();
        const arrowR = new Div();
        const dots = new Div();
        this.controller = new CarouselControler(track, components, this.carouselDotsCssClass(), this.carouselAvtiveCssClass());

        track.cssClass(this.carouselTrackCssClass());
        track.children(components.items);

        dots.cssClass(this.carouselDotsCssClass());
        dots.children(components.dots);

        arrowL.content("❮");
        arrowL.cssClass(`${this.carouselArrowCssClass()} ${this.carouselLeftCssClass()}`);
        arrowL.onClick(() => this.controller.moveSlide(-1));

        arrowR.content("❯");
        arrowR.cssClass(`${this.carouselArrowCssClass()} ${this.carouselRightCssClass()}`);
        arrowR.onClick(() => this.controller.moveSlide(1));

        this.children().push(track);
        this.children().push(arrowL);
        this.children().push(arrowR);
        this.children().push(dots);

        this.setCss();
    }

    private setCss() {
        this.css()
        .class(this.carouselCssClass(), `position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
    border-radius: 12px;
    background: #2a2a40;`)
        .class(this.carouselTrackCssClass(), `display: flex;
    transition: transform 0.5s ease-in-out;
    height: 100%;`)
        .class(this.carouselSlideCssClass(), `min-width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #ccc;`)
        .class(this.carouselArrowCssClass(), `position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(20, 20, 34, 0.7);
    border: none;
    color: #b084ff;
    font-size: 22px;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    transition: 0.2s;`)
        .class(this.carouselDotsCssClass(), `    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;`)
        .combinator(Css.decendent(Css.class(this.carouselDotsCssClass()), Css.element("span")), `display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 5px;
    background: #555;
    border-radius: 50%;
    cursor: pointer;`)
        .combinator(Css.decendent(Css.class(this.carouselDotsCssClass()), Css.class(this.carouselAvtiveCssClass())), `background: #b084ff;`)
        .combinator(Css.combined(Css.class(this.carouselArrowCssClass()), Css.class(this.carouselLeftCssClass())), `left: 10px;`)
        .combinator(Css.combined(Css.class(this.carouselArrowCssClass()), Css.class(this.carouselRightCssClass())), `right: 10px;`)
        .hover(Css.class(this.carouselArrowCssClass()), `background: rgba(128, 0, 255, 0.4);`);
    }

    private createItemsDots(items: CarouselItem[]): ItemsDots {
        const is: Div[] = [];
        const ds: Span[] = [];
        
        items.forEach(item => {
            const i = new Div();
            i.content(item.content);
            i.cssClass(this.carouselSlideCssClass());

            const d = new Span();

            is.push(i);
            ds.push(d);
        });

        return {
            items: is,
            dots: ds
        }
    }

    public carouselCssClass(): string {
        return `${Carousel.CAROUSEL_CSS_CLASS}_${this.getId()}`;
    }

    public carouselTrackCssClass(): string {
        return `${Carousel.CAROUSEL_TRACK_CSS_CLASS}_${this.getId()}`;
    }

    public carouselDotsCssClass(): string {
        return `${Carousel.CAROUSEL_DOTS_CSS_CLASS}_${this.getId()}`;
    }

    public carouselArrowCssClass(): string {
        return `${Carousel.CAROUSEL_ARROW_CSS_CLASS}_${this.getId()}`;
    }

    public carouselLeftCssClass(): string {
        return `${Carousel.CAROUSEL_LEFT_CSS_CLASS}_${this.getId()}`;
    }

    public carouselRightCssClass(): string {
        return `${Carousel.CAROUSEL_RIGHT_CSS_CLASS}_${this.getId()}`;
    }

    public carouselSlideCssClass(): string {
        return `${Carousel.CAROUSEL_SLIDE_CSS_CLASS}_${this.getId()}`;
    }

    public carouselAvtiveCssClass(): string {
        return `${Carousel.CAROUSEL_ACTIVE_CSS_CLASS}_${this.getId()}`;
    }
}

interface ItemsDots {
    items: Div[];
    dots: Span[];
}

export interface CarouselItem {
    content: string;
}

class CarouselControler {
    private index: number = 0;
    private intervalId: NodeJS.Timer;
    
    constructor(private track: Div, private components: ItemsDots, private cssDotsClass: string, private activeClass: string) {
        // Auto-slide (optional)
        this.intervalId = this.autoMoveSlide();
        components.dots.forEach((d, i) => d.onClick(() => this.goToSlide(i)));
    }

    private updateCarousel() {
        clearInterval(this.intervalId);
        // this.track.style(`transform = "translateX(-${this.index * 100}%)";`);
        // TODO: this uses native HTML 
        document.getElementById(this.track.getId())!.style.transform = `translateX(-${this.index * 100}%)`;

        document.querySelectorAll(`.${this.cssDotsClass} span`).forEach((dot, i) => {
            dot.classList.toggle(this.activeClass, i === this.index);
        });

        this.intervalId = this.autoMoveSlide();
    }

    private goToSlide(index: number): void {
        this.index = index;
        this.updateCarousel();
    }

    private autoMoveSlide(ms: number = 5000): NodeJS.Timer {
        return setInterval(() => {
            this.moveSlide(1);
        }, ms);
    }

    public moveSlide(direction: number) {
        this.index += direction;

        if (this.index < 0) this.index = this.components.items.length - 1;
        if (this.index >= this.components.items.length) this.index = 0;

        this.updateCarousel();
    }
}