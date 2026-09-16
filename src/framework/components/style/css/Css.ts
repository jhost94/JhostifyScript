import Style from "../Style";
import CssSelector from "./CssSelector";

export default class Css {
    private data: Map<string, string> = new Map();

    public static newSelector(options: CssOptions = {isScss: false, isPage: false}): CssSelector {
        return new CssSelector(options);
    }

    public static fromSelectorAndStyle(selector: CssSelector, style: Style): Css {
        const css = new Css();
        css.add(selector.style(style));
        return css;
    }
    
    constructor(private internalCss: string = '') {
        if (internalCss && internalCss.trim().length > 0) {
            this.deserialize();
        }
    }


    /**
     * Convert data into string
     */
    public serialize(minimize: boolean = false): Css {
        this.internalCss = '';
        this.data.forEach((v, k) => {
            if (minimize) {
                this.internalCss += `${k}{${v.replace(/\s+/g, "")}} `;
            } else {
                this.internalCss += `${k} {
                    ${v}
                    }
                    `;
                }
            });
        return this;
    }

    /**
     * Add another CSS to this one
     */
    public concat(css: Css): Css {
        css.data.forEach((v, k) => {
            if (!this.data.has(k)) this.data.set(k, v);
        });
        return this;
    }

    public getCss(doSerialize: boolean = false): string {
        return doSerialize ? this.serialize().getCss() : this.internalCss;
    }

    public add(style: {selector: string, value: string}): Css {
        this.data.set(style.selector, style.value);
        return this;
    }
    
    /**
     * Convert string into data
     */
    private deserialize(): Css {
        //TODO: do
        return this;
    }
}

export interface CssOptions {
    isScss?: boolean;
    isPage?: boolean;
    minify?: boolean;
}

export type CssAttributeVariantType = "DEFAULT" | "STARTS_WITH" | "ENDS_WITH" | "CONTAINS";
