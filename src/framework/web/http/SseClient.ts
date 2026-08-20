import HttpClient, { RequestOptions } from "./HttpClient";

export default class SseClient<D = string, I = string> extends HttpClient {
    private customEvents: Map<string, (ev: SseMessageEvent<D, I>) => any> = new Map();
    private reader?: ReadableStreamReader<any>;
    private stop: boolean = false;

    constructor(private parse: boolean = false) {
        super();
    }

    private onCustomEvent(event: SseMessageEvent): void {
        const action = this.customEvents.get(event.id);
        if (action) {
            action(event);
        }
    }

    public onMessage: ((this: SseClient<D, I>, ev: SseMessageEvent<D, I>) => any) | null = e => {};
    public onOpen: ((this: SseClient<D, I>, ev: SseMessageEvent<D, I>) => any) | null = e => {};
    public onError: ((this: SseClient<D, I>, ev: SseMessageEvent<D, I>) => any) | null = e => {};

    public async connect(url: string, requestOptions?: RequestOptions) {
        const response = await this.coreRequest(url, requestOptions);

        if (!response.body) throw `Body was not found on response: ${response}`;
        this.reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer: string = "";

        while (!this.stop) {
            const { done, value } = await this.reader.read();

            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            let parts: string[] = buffer?.split("\n\n") ?? [];

            if (parts.length > 0) {
                buffer = parts.pop()!; // keep incomplete chunk
            } else {
                buffer = "";
            }

            for (const part of parts) {
                const event: SseMessageEvent = {type: "", data: "", id: ""};
                const lines = part.split("\n");

                for (const line of lines) {
                    if (line.startsWith("event:")) {
                        event.type = line.slice(6).trim();
                    } else if (line.startsWith("data:")) {
                        event.data = (event.data || "") + line.slice(5).trim();
                    } else if (line.startsWith("id:")) {
                        event.id = line.slice(3).trim();
                    }
                }

                if (this.parse && event.data) event.data = JSON.parse(event.data);
                if (this.parse && event.id) event.id = JSON.parse(event.id);

                switch(event.type) {
                    case "message":
                        if (this.onMessage) this.onMessage(event);
                        break;
                    case "error":
                        if (this.onError) this.onError(event);
                        break;
                    case "open":
                        if (this.onOpen) this.onOpen(event);
                        break;
                    default:
                        this.onCustomEvent(event);
                }
            }
        }

        this.reader.releaseLock();
    }

    public addEventListener(event: string, action: (this: SseClient, ev: SseMessageEvent<D, I>) => any): void {
        this.customEvents.set(event, action);
    }

    public async close(reason?: any): Promise<void> {
        this.stop = true;
        return this.reader?.cancel(reason);
    }
}

export interface SseMessageEvent<D = any, I = any> {
    type: string;
    data: D;
    id: I;
}