
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
        return this.set(`${selector}:hover`, value);
    }

    private set(key: string, value: string): Css {
        this.data.set(key, value);
        return this;
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
        console.log("Concatinating ", css, "with", this)
        css.data.forEach((v, k) => {
            if (!this.data.has(k)) this.data.set(k, v);
        });
        return this;
    }


    /**
     * Long list of concerns got from GPT:
     * 
     * 🧬 2. Attribute Selectors
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

    
     * 🎭 3. Pseudo-Classes (State-Based)
    * These are dynamic or structural.
        - Interaction
            - :hover
            - :active
            - :focus
            - :visited
        - Structural
            - :first-child
            - :last-child
            - :nth-child(n)
            - :nth-of-type(n)
            - :only-child
        - Logical / advanced
            - :not(selector)
            - :is(selector)
            - :where(selector)
            - :has(selector) ⚠️ very important & complex
        Ex: 
            div:not(.active)
            div:has(img)
        

         * 🧪 4. Pseudo-Elements
        These create virtual elements:
            - ::before
            - ::after
            - ::placeholder
            - ::marker
            - ::selection
        Ex: .button::before { ... }

     
     * 🧩 5. Selector Nesting (Important for Parsing)
        Even if you don’t support it now, users may expect:
        .carousel {
            .slide {
                ...
            }
        }

        This is not native CSS (yet widely), but tools support it.
        You may ignore for now, but be aware.

     
     * 🌍 6. Global / Root-Level Selectors
        These are special:
            - html
            - body
            - :root
        ⚠️ These should NOT be scoped like normal selectors.
    

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
    

     * 🎯 8. Specificity Rules (CRITICAL)
        CSS has priority rules:
            ID > Class > Element
        ex: 
            #id { }        // highest
            .class { }
            div { }        // lowest
        Your system must not accidentally break specificity when scoping.

    
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



     * 🔁 15. Inheritance
        Some properties inherit:
            - color ✅
            - font-family ✅
            - margin ❌
        Important for cross-platform later.
    


     * 🧠 16. Order Matters
        CSS is order-dependent:
        Later rules override earlier ones.
        Your system must preserve order.
     */
}

export interface CssOptions {
    isScss: boolean;
    isPage: boolean;
}