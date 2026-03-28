import PageRenderer from "src/framework/renderers/PageRenderer";
import Button from "../basic/form/Button";
import Aside from "../basic/formatting/Aside";
import Div from "../basic/formatting/Div";
import Nav from "../basic/formatting/Nav";
import Span from "../basic/formatting/Span";
import Img from "../basic/graphics/Img";
import A from "../basic/link/A";
import Context from "src/framework/Context";
import Css from "../Css";

export default class Navbar extends Aside {
    public static readonly NAVBAR_CSS_CLASS: string = "jhostify-navbar";
    public static readonly NAVBAR_HEADER_CSS_CLASS: string = "jhostify-navbar-header";
    public static readonly NAVBAR_TOGGLE_BTN_CSS_CLASS: string = "jhostify-navbar-toggle-btn";
    public static readonly NAVBAR_EXPANDED_CSS_CLASS: string = "jhostify-navbar-expanded";
    public static readonly NAVBAR_LOGO_CSS_CLASS: string = "jhostify-navbar-logo";
    public static readonly NAVBAR_NAV_LINKS_CSS_CLASS: string = "jhostify-navbar-nav-links";

    constructor(navbarLinks: NavbarNavLink[], private options?: NavbarOptions) {
        super();
        this.cssClass(this.navbarCssClass());

        const linksCssClasses = navbarLinks.map(l => l.updateCssClass(s => this.uniqueCssClass(s)));

        const d = new Div();
        d.cssClass(this.navbarHeaderCssClass());

        if (this.getOption("isOnClick")) {
            const db = new Button();
            db.cssClass(this.navbarToggleBtnCssClass());
            db.content(this.getOptionString("menuSymbol"));
            db.onClick(() => document.getElementById(this.getId())?.classList.toggle(this.navbarExpandedCssClass()));
            d.children().push(db);
        } else {
            const sb = new Span();
            sb.content(this.getOptionString("menuSymbol"));
            sb.cssClass(this.navbarToggleBtnCssClass());
            d.children().push(sb);
        }

        const ds = new Span();
        ds.cssClass(this.navbarLogoCssClass());
        ds.content(this.getOptionString("logoContent"));

        d.children().push(ds);

        const nav = new Nav();
        nav.cssClass(this.navbarNavLinksCssClass());
        nav.children(navbarLinks);
        this.children().push(d);
        this.children().push(nav);

        if (this.getOption("isOnHover")) {
            this.onMouseOver(e => {
                e.stopPropagation();
                const el = document.getElementById(this.getId());
                if (!el?.classList.contains(this.navbarExpandedCssClass())) {
                    el?.classList.add(this.navbarExpandedCssClass());
                }
            });

            this.onMouseOut(e => {
                e.stopPropagation();
                const el = document.getElementById(this.getId());
                if (el?.classList.contains(this.navbarExpandedCssClass())) {
                    el?.classList.remove(this.navbarExpandedCssClass());
                }
            });
        }

        this.setupCss(linksCssClasses);
    }

    private setupCss(linksCssClasses: {nav: string, span: string}[]): void {
        this.css()
            .class(this.navbarCssClass(), `width: 70px;
    height: 100vh;
    background: #141422;
    position: fixed;
    transition: width 0.3s ease;
    overflow: hidden;
    border-right: 1px solid #2c2c44;`)
        .combinator(Css.combined(Css.class(this.navbarCssClass()), Css.class(this.navbarExpandedCssClass())), `width: 220px;`)
        .class(this.navbarHeaderCssClass(), `display: flex;
    align-items: center;
    padding: 20px;`)
        .class(this.navbarToggleBtnCssClass(), `background: none;
    border: none;
    color: #b084ff;
    font-size: 22px;
    cursor: pointer;`)
        .class(this.navbarLogoCssClass(), `margin-left: 15px;
    font-weight: bold;
    display: none;`)
        .combinator(Css.decendent(Css.combined(Css.class(this.navbarCssClass()), Css.class(this.navbarExpandedCssClass())), Css.class(this.navbarLogoCssClass())) , `display: inline;`)
        .class(this.navbarNavLinksCssClass(), `margin-top: 40px;
    display: flex;
    flex-direction: column;`)
        .combinator(Css.decendent(Css.class(this.navbarNavLinksCssClass()), Css.element("a")), `display: flex;
    align-items: center;
    padding: 15px 20px;
    text-decoration: none;
    color: #ccc;
    transition: background 0.2s;`)
        .hover(Css.decendent(Css.class(this.navbarNavLinksCssClass()), Css.element("a")), `background: #24243a;
    color: #b084ff;`);
        

        linksCssClasses.forEach(l => {
            this.css()
                .class(l.nav, `font-size: 18px;`)
                .class(l.span, `margin-left: 15px;
    display: none;`)
                .combinator(Css.decendent(Css.combined(Css.class(this.navbarCssClass()), Css.class(this.navbarExpandedCssClass())), Css.class(l.span)), `display: inline;`)
        });
    }

    private getOption(opt: keyof NavbarOptions) {
        return this.options ? 
            this.options[opt] ?? defaultOptions[opt]
            : defaultOptions[opt];
    }

    private getOptionString(opt: keyof NavbarOptions): string {
        return this.getOption(opt) as string;
    }

    private navbarCssClass(): string {
        return this.uniqueCssClass(Navbar.NAVBAR_CSS_CLASS);
    }

    private navbarHeaderCssClass(): string {
        return this.uniqueCssClass(Navbar.NAVBAR_HEADER_CSS_CLASS);
    }

    private navbarToggleBtnCssClass(): string {
        return this.uniqueCssClass(Navbar.NAVBAR_TOGGLE_BTN_CSS_CLASS);
    }

    private navbarExpandedCssClass(): string {
        return this.uniqueCssClass(Navbar.NAVBAR_EXPANDED_CSS_CLASS);
    }

    private navbarLogoCssClass(): string {
        return this.uniqueCssClass(Navbar.NAVBAR_LOGO_CSS_CLASS);
    }

    private navbarNavLinksCssClass(): string {
        return this.uniqueCssClass(Navbar.NAVBAR_NAV_LINKS_CSS_CLASS);
    }
}

export class NavbarNavLink extends A {

    constructor(
            icon_src: string, 
            content: string, 
            routeId?: string, 
            alt?: string,
            cssClass: string = "icon", 
            innerCssClass: string = "text"
        ) {
        super();
        // TODO: CREATE SVG COMPONENT TO BE ABLE TO CREATE CUSTOM SVG AND COLOR USING CSS ETC
        const icon = new Img();
        icon.src(icon_src);
        if (alt) icon.alt(alt);

        icon.height("25");
        icon.color("red");

        this.cssClass(cssClass);
        if (routeId) {
            this.onClick(() => {
                PageRenderer.refresh();
                Context.router().navigate({id: routeId});
            });
        }

        const s = new Span();
        s.content(content);
        s.cssClass(innerCssClass);

        this.children().push(icon);
        this.children().push(s);
    }

    public updateCssClass(updater: (s: string) => string): {nav: string, span: string} {
        return {
            nav: this.cssClass(updater(this.cssClass()!))!,
            span: this.children()[1].cssClass(updater(this.children()[1].cssClass()!))!
        }
    }
}

export interface NavbarOptions {
    isOnClick?: boolean;
    isOnHover?: boolean;
    menuSymbol?: string;
    logoContent?: string;
}

const defaultOptions: NavbarOptions = {
    isOnClick: false,
    isOnHover: true,
    menuSymbol: "☰",
    logoContent: "Nav"
}