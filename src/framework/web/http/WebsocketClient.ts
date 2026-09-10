import HttpClient from "./HttpClient";

export default class WebsocketClient extends HttpClient {
    private webSocket?: WebSocket;
    private listeners: Map<string, EventListenerOrEventListenerObject> = new Map();
    private onclose: ((this: WebSocket, ev: CloseEvent) => any) | null = null;
    private onerror: ((this: WebSocket, ev: Event) => any) | null = null;
    private onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null = null;
    private onopen: ((this: WebSocket, ev: Event) => any) | null = null;

    public connect(url: string, protocols?: string | string[]): void {
        if (this.isOpen() || this.webSocket?.readyState === WebSocket.CONNECTING) {
            this.webSocket!.close();
        }

        this.webSocket = new WebSocket(url, protocols);
        this.syncEvents();
    }

    public isOpen(): boolean {
        return !!this.webSocket && this.webSocket.readyState === WebSocket.OPEN;
    }

    public addEventListener(event: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        if (!this.isOpen()) throw "Web Socket is not connected";
        this.listeners.set(event, listener);
        this.webSocket!.addEventListener(event, listener, options);
    }

    public close(code?: number, reason?: string): void {
        if (!this.webSocket || this.webSocket.readyState === WebSocket.CLOSED) {
            this.webSocket = undefined;
            return;
        }

        this.webSocket.close(code, reason);
    }

    public dispatchEvent(event: Event): boolean {
        if (!this.isOpen()) throw "Web Socket is not connected";
        return this.webSocket!.dispatchEvent(event);
    }

    public removeEventListener(event: string): void {
        if (!this.isOpen()) return;
        const e = this.listeners.get(event);
        if (e) {
            this.listeners.delete(event);
            this.webSocket!.removeEventListener(event, e);
        }
    }

    public send(data: string | Blob | BufferSource): void {
        if (!this.isOpen()) throw "Web Socket is not connected";
        this.webSocket!.send(data);
    }

    public onClose(onclose: ((this: WebSocket, ev: CloseEvent) => any) | null): void {
        this.onclose = onclose;
        if (this.webSocket) this.webSocket.onclose = onclose;
    }

    public onError(onerror: ((this: WebSocket, ev: Event) => any) | null): void {
        this.onerror = onerror;
        if (this.webSocket) this.webSocket.onerror = onerror;
    }

    public onMessage(onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null): void {
        this.onmessage = onmessage;
        if (this.webSocket) this.webSocket.onmessage = onmessage;
    }

    public onOpen(onopen: ((this: WebSocket, ev: Event) => any) | null): void {
        this.onopen = onopen;
        if (this.webSocket) this.webSocket.onopen = onopen;
    }

    private syncEvents(): void {
        if (!this.webSocket) return;
        this.webSocket.onclose = this.onclose;
        this.webSocket.onerror = this.onerror;
        this.webSocket.onmessage = this.onmessage;
        this.webSocket.onopen = this.onopen;

        for (const [event, listener] of this.listeners.entries()) {
            this.webSocket.addEventListener(event, listener);
        }
    }
}

export class WebsocketClientEvent {

    constructor(private type: string, private eventInitDict?: WebsocketClientEventInit) {

    }
}

export interface WebsocketClientEventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}