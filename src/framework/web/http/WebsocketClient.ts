import HttpClient from "./HttpClient";

export default class WebsocketClient extends HttpClient {
    private webSocket?: WebSocket;
    private isConnected: boolean = false;
    private listeners: Map<string, EventListenerOrEventListenerObject> = new Map();

    public connect(url: string): void {
        this.webSocket = new WebSocket(url);
        this.isConnected = true;
    }

    public addEventListener(event: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
        if (!this.isConnected) throw "Web Socket is not connected";
        this.listeners.set(event, listener);
        this.webSocket?.addEventListener(event, listener, options);
    }

    public close(code?: number, reason?: string): void {
        if (!this.isConnected) throw "Web Socket is not connected";
        this.webSocket?.close(code, reason);
        this.isConnected = false;
    }

    public dispatchEvent(event: Event): boolean {
        if (!this.isConnected) throw "Web Socket is not connected";
        return this.webSocket!.dispatchEvent(event);
    }

    public removeEventListener(event: string): void {
        if (!this.isConnected) throw "Web Socket is not connected";
        const e = this.listeners.get(event);
        if (e) {
            this.listeners.delete(event);
            this.webSocket?.removeEventListener(event, e);
        }
    }

    public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
        if (!this.isConnected) throw "Web Socket is not connected";
        this.webSocket?.send(data);
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