
export default class Css {
    private data: Map<string, string> = new Map();

    constructor(private internalCss: string = '', private options: CssOptions = {
        isScss: false,
        isPage: false
    }) {
        if (options) {
            if (options.isScss) this.processScss();
        }
        if (internalCss && internalCss.trim().length > 0) {
            this.deserialize();
        }
    }

    public static class(clazz: string): string {
        return `.${clazz}`;
    }

    public static element(element: string): string {
        return element;
    }

    public static id(id: string): string {
        return `#${id}`;
    }

    public static decendent(parent: string, child: string): string {
        return `${parent} ${child}`;
    }

    public static combined(parent: string, child: string): string {
        return `${parent}${child}`;
    }

    public static directChild(parent: string, child: string): string {
        return `${parent} > ${child}`;
    }

    public static adjacentSibling(parent: string, child: string): string {
        return `${parent} + ${child}`;
    }

    public static generalSibling(parent: string, child: string): string {
        return `${parent} ~ ${child}`;
    }

    public static hover(selector: string): string {
        return `${selector}:hover`;
    }

    public static active(selector: string): string {
        return `${selector}:active`;
    }

    public static focus(selector: string): string {
        return `${selector}:focus`;
    }

    public static visited(selector: string): string {
        return `${selector}:visited`;
    }

    public static firstChild(selector: string): string {
        return `${selector}:first-child`;
    }

    public static lastChild(selector: string): string {
        return `${selector}:last-child`;
    }

    public static nthChild(selector: string, number: number): string {
        return `${selector}:nth-child(${number})`;
    }
    
    public static nthOfType(selector: string, number: number): string {
        return `${selector}:nth-of-type(${number})`;
    }
    
    public static onlyChild(selector: string): string {
        return `${selector}:only-child`;
    }

    public static not(element: string, selector: string): string {
        return `${element}:not(${selector})`;
    }

    public static is(element: string, selector: string): string {
        return `${element}:is(${selector})`;
    }

    public static where(element: string, selector: string): string {
        return `${element}:where(${selector})`;
    }

    public static has(element: string, selector: string): string {
        return `${element}:has(${selector})`;
    }

    public static before(selector: string): string {
        return `${selector}::before`;
    }

    public static after(selector: string): string {
        return `${selector}::after`;
    }

    public static placeholder(selector: string): string {
        return `${selector}::placeholder`;
    }

    public static marker(selector: string): string {
        return `${selector}::marker`;
    }

    public static selection(selector: string): string {
        return `${selector}::selection`;
    }

    private processScss() {
        throw "Sass/SCSS is not yet implemented";
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
     * Basic Selectors
     */

    public class(clazz: string, value: string): Css {
        return this.set(Css.class(clazz), value);
    }

    public element(element: string, value: string): Css {
        return this.set(Css.element(element), value);
    }

    public id(id: string, value: string): Css {
        return this.set(Css.id(id), value);
    }

    /**
     * Combinators (Relationships)
     * Usage:
     * @method combinator(Css.decendent(Css.class("slide"), Css.element("div")), "background-color: black");
     */
    public combinator(relation: string, value: string): Css {
        return this.set(relation, value);
    }

    public group(selectors: string[], value: string): Css {
        return this.set(selectors.reduce((p, c) => `${p}, ${c}`), value);
    }

    public all(value: string): Css {
        if (this.options.isPage) return this.set("*", value);
        throw "This is not a page, cannot set css for all"
    }

    /**
     * Same as @method all
     */
    public universal(value: string): Css {
        return this.all(value);
    }

    public hover(selector: string, value: string): Css {
        return this.set(Css.hover(selector), value);
    }

    public active(selector: string, value: string): Css {
        return this.set(Css.active(selector), value);
    }

    public focus(selector: string, value: string): Css {
        return this.set(Css.focus(selector), value);
    }

    public visited(selector: string, value: string): Css {
        return this.set(Css.visited(selector), value);
    }

    public firstChild(selector: string, value: string): Css {
        return this.set(Css.firstChild(selector), value);
    }

    public lastChild(selector: string, value: string): Css {
        return this.set(Css.lastChild(selector), value);
    }

    public nthChild(selector: string, number: number, value: string): Css {
        return this.set(Css.nthChild(selector, number), value);
    }
    
    public nthOfType(selector: string, number: number, value: string): Css {
        return this.set(Css.nthOfType(selector, number), value);
    }
    
    public onlyChild(selector: string, value: string): Css {
        return this.set(Css.onlyChild(selector), value);
    }

    public not(element: string, selector: string, value: string): Css {
        return this.set(Css.not(element, selector), value);
    }

    public is(element: string, selector: string, value: string): Css {
        return this.set(Css.is(element, selector), value);
    }

    public where(element: string, selector: string, value: string): Css {
        return this.set(Css.where(element, selector), value);
    }

    public has(element: string, selector: string, value: string): Css {
        return this.set(Css.has(element, selector), value);
    }


    /**
     * Attribute Selectors
        - ex: 
            input[type="text"]
            div[data-id="123"]
            a[href^="https"]
            img[src$=".png"]

        Variants:
            [attr]
            [attr=value]
            [attr^=value] (starts with)
            [attr$=value] (ends with)
            [attr*=value] (contains)
     * @param element The element to point to, example a, div, span, input, img, etc
     * @param attribute The specific attribute, example src for img, type for input, etc
     * @param value The CSS value
     * @param attributeValue Attribute value, such as the source for the src, etc
     * @param variant Attribute Selectors can accept exact value, starts with, ends with and contains. By default is exact value
     */
    public attribute(element: string, attribute: string, value: string, attributeValue?: string, variant: CssAttributeVariantType = "DEFAULT", caseSensitive?: "case-sensitive" | "case-insensitive") {
        if (attributeValue) {
            const key: string = caseSensitive ?
                `${Css.element(element)}[${attribute}${this.attributeValue(variant)}"${attributeValue}" ${this.attributeCaseSensitivity(caseSensitive)}]`
                : `${Css.element(element)}[${attribute}${this.attributeValue(variant)}"${attributeValue}"]`;
            this.set(key, value);
        } else {
            this.set(`${Css.element(element)}[${attribute}]`, value);
        }
    }

    public before(selector: string, value: string): Css {
        return this.set(Css.before(selector), value);
    }

    public after(selector: string, value: string): Css {
        return this.set(Css.after(selector), value);
    }

    public placeholder(selector: string, value: string): Css {
        return this.set(Css.placeholder(selector), value);
    }

    public marker(selector: string, value: string): Css {
        return this.set(Css.marker(selector), value);
    }

    public selection(selector: string, value: string): Css {
        return this.set(Css.selection(selector), value);
    }

    public html(value: string): Css {
        return this.set("html", value);
    }

    public body(value: string): Css {
        return this.set("body", value);
    }

    public root(value: string): Css {
        return this.set(":root", value);
    }

    private set(key: string, value: string): Css {
        this.data.set(key, value);
        return this;
    }

    private attributeValue(variant: CssAttributeVariantType): string {
        switch (variant) {
            case 'CONTAINS':
                return "*=";
            case 'ENDS_WITH':
                return "$=";
            case 'STARTS_WITH':
                return "^";
            default:
                return "=";
        }
    }

    private attributeCaseSensitivity(caseSensitive: "case-sensitive" | "case-insensitive"): string {
        switch (caseSensitive) {
            case 'case-sensitive':
                return "s";
            case 'case-insensitive':
                return "i";
        }
    }

    /**
     * Convert string into data
     */
    private deserialize(): Css {
        //TODO: do
        return this;
    }

    public getCss(doSerialize: boolean = false): string {
        if (doSerialize) this.serialize();
        return this.internalCss;
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


    /**
     * TODO:
     * Implement missing features
     * 
     
     * 🧩 5. Selector Nesting (Important for Parsing)
        Even if you don’t support it now, users may expect:
        .carousel {
            .slide {
                ...
            }
        }

        This is not native CSS (yet widely), but tools support it.
        You may ignore for now, but be aware.
     
     * 📐 7. At-Rules (VERY Important)
        These are not selectors, but wrappers.

        - Media Queries
            @media (max-width: 768px) {
                .carousel { ... }
            }
        - Keyframes (animations)
            @keyframes slide {
                from { ... }
                to { ... }
            }
            ⚠️ Names must not collide → may need scoping too.
        - Font Face
            @font-face {
               font-family: "MyFont";
            }
        - Supports
            @supports (display: grid) {
                ...
            }
    
     * 🔗 9. Chained Selectors
        ex: div.carousel.active[data-x="1"]:hover

        These stack:
            - element
            - class
            - attribute
            - pseudo-class


     * 🧠 10. Complex Selector Functions
        These are tricky:
            :not(.a, .b)
            :is(.a, .b)
            :where(.a, .b)
            :has(.child)
        They contain nested selectors inside selectors.

    
     * ⚠️ 11. Things That Break Naive Scoping
        ❌ Global selectors
            body { }
            html { }
            * { }
        ❌ Root-relative logic
            :root { }
        ❌ Keyframes (name collisions)
            @keyframes slide
        ❌ :has()
            div:has(.child)
        ❌ Grouped selectors
            .a, .b, .c
        (each must be scoped individually)


     * 🧱 12. CSS Properties (The Other Half)
        Selectors are only half.
        Properties include:
            Layout: display, position, flex, grid
                - Box model: margin, padding, border
                - Typography: font, line-height
                - Visual: background, color, box-shadow
                - Animation: animation, transition
                - 👉 You do NOT need to model all properties now
                - Just allow key/value storage.
    

     * 🎯 13. Units & Values
        10px
        2rem
        50%
        calc(100% - 20px)
        var(--color)
    

     * 🌱 14. CSS Variables (Custom Properties)
        :root {
            --main-color: red;
        }

        div {
            color: var(--main-color);
        }

     */
}

export interface CssOptions {
    isScss: boolean;
    isPage: boolean;
}

export type CssAttributeVariantType = "DEFAULT" | "STARTS_WITH" | "ENDS_WITH" | "CONTAINS";
