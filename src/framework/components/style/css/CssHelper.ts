
export default class CssHelper {

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
}