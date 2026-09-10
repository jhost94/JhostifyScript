import HttpClient, { RequestOptions } from "./HttpClient";

export default class SseClient<D = string, I = string> extends HttpClient {
    private customEvents: Map<string, (ev: SseMessageEvent<D, I>) => any> = new Map();
    private reader?: ReadableStreamDefaultReader<Uint8Array>;
    private stop: boolean = false;
    private onmessage: (this: SseClient<D, I>, ev: SseMessageEvent<D, I>) => any = e => {};
    private onopen: (this: SseClient<D, I>, ev: SseMessageEvent<D, I>) => any = e => {};
    private onerror: (this: SseClient<D, I>, ev: SseMessageEvent<D, I>) => any = e => {};

    constructor(private parse: boolean = false) {
        super();
    }

    private onCustomEvent(event: SseMessageEvent): void {
        const action = this.customEvents.get(event.id);
        if (action) {
            action(event);
        }
    }

    public async connect(url: string, requestOptions?: RequestOptions) {
        this.stop = false;
        this.resetReader();

        const response = await this.coreRequest(url, requestOptions);

        if (!response.body) throw `Body was not found on response: ${response}`;
        this.reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer: string = "";

        try {
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
                            this.onmessage(event);
                            break;
                        case "error":
                            this.onerror(event);
                            break;
                        case "open":
                            this.onopen(event);
                            break;
                        default:
                            this.onCustomEvent(event);
                    }
                }
            }
        } catch (error) {
            if (!this.stop) {
                throw error;
            }
        } finally {
            this.resetReader();
        }
    }

    public addEventListener(event: string, action: (this: SseClient, ev: SseMessageEvent<D, I>) => any): void {
        this.customEvents.set(event, action);
    }

    public async close(reason?: any): Promise<void> {
        this.stop = true;

        if (!this.reader) return;

        const currentReader = this.reader;
        this.reader = undefined;

        try {
            await currentReader.cancel(reason);
        } catch {
            // ignore when stream is already closed or unusable
        }

        try {
            currentReader.releaseLock();
        } catch {
            // ignore when lock is already released
        }
    }

    public onMessage(onmessage: (this: SseClient<D, I>, ev: SseMessageEvent<D, I>) => any) {
        this.onmessage = onmessage;
    }

    public onOpen(onopen: (this: SseClient<D, I>, ev: SseMessageEvent<D, I>) => any) {
        this.onopen = onopen;
    }

    public onError(onerror: (this: SseClient<D, I>, ev: SseMessageEvent<D, I>) => any) {
        this.onerror = onerror;
    }

    private resetReader(): void {
        if (this.reader) {
            try {
                this.reader.releaseLock();
            } catch {
                // stream may already be closed
            }
            this.reader = undefined;
        }
    }
}

export interface SseMessageEvent<D = any, I = any> {
    type: string;
    data: D;
    id: I;
}