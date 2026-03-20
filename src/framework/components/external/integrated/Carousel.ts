import Div from "../basic/formatting/Div";
import Span from "../basic/formatting/Span";
import Component from "../Component";

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

        this.cssClass(Carousel.CAROUSEL_CSS_CLASS);
        const components = this.createItemsDots(items);
        
        const track = new Div();
        const arrowL = new Div();
        const arrowR = new Div();
        const dots = new Div();
        this.controller = new CarouselControler(track, components);

        track.cssClass(Carousel.CAROUSEL_TRACK_CSS_CLASS);
        track.children(components.items);

        dots.cssClass(Carousel.CAROUSEL_DOTS_CSS_CLASS);
        dots.children(components.dots);

        arrowL.content("❮");
        arrowL.cssClass(`${Carousel.CAROUSEL_ARROW_CSS_CLASS} ${Carousel.CAROUSEL_LEFT_CSS_CLASS}`);
        arrowL.onClick(() => this.controller.moveSlide(-1));

        arrowR.content("❯");
        arrowR.cssClass(`${Carousel.CAROUSEL_ARROW_CSS_CLASS} ${Carousel.CAROUSEL_RIGHT_CSS_CLASS}`);
        arrowR.onClick(() => this.controller.moveSlide(1));

        this.children().push(track);
        this.children().push(arrowL);
        this.children().push(arrowR);
        this.children().push(dots);
    }

    private createItemsDots(items: CarouselItem[]): ItemsDots {
        const is: Div[] = [];
        const ds: Span[] = [];
        
        items.forEach(item => {
            const i = new Div();
            i.content(item.content);
            i.cssClass(Carousel.CAROUSEL_SLIDE_CSS_CLASS);

            const d = new Span();

            is.push(i);
            ds.push(d);
        });

        return {
            items: is,
            dots: ds
        }
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
    private itemIds: string[];
    
    constructor(private track: Div, private components: ItemsDots) {
        // Auto-slide (optional)
        this.intervalId = this.autoMoveSlide();
        this.itemIds = components.items.map(i => i.getId())
        components.dots.forEach((d, i) => d.onClick(() => this.goToSlide(i)));
    }

    private updateCarousel() {
        clearInterval(this.intervalId);
        // this.track.style(`transform = "translateX(-${this.index * 100}%)";`);
        // TODO: this uses native HTML 
        document.getElementById(this.track.getId())!.style.transform = `translateX(-${this.index * 100}%)`;

        document.querySelectorAll(`.${Carousel.CAROUSEL_DOTS_CSS_CLASS} span`).forEach((dot, i) => {
            dot.classList.toggle("active", i === this.index);
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