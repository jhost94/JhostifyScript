class PageLocation {
    constructor(private baseURL: string, private path: string, private requestParams: Map<string, string> = new Map(), private fragment: string = ''){
    }

    public getPath(): string {
        return this.path;
    }
}

export default PageLocation