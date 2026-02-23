
export default class Css {

    constructor(private internalCss: string = '', private isScss: boolean = false) {
        if (isScss) {
            this.processScss();
        }
    }

    private processScss() {
        throw "Sass/SCSS is not yet implemented";
    }

    public getCss(): string {
        return this.internalCss;
    }
}