class Navigation {

}

interface Navigatable {
    pushState(data: any, name: string, path: string): void
}

export default Navigation;
export { Navigatable };