import Context from "../../Context";
import HttpClient, { RequestOptions, ResponseBodyType } from "./HttpClient";

export default class RestClient<T> extends HttpClient {
    

    private async mapToRestResponse(response: Response, responseBodyType: ResponseBodyType): Promise<RestResponse<T>> {
        return {
            statusCode: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: await this.getBodyByBodyType(response, responseBodyType),
            ok: response.ok,
            redirected: response.redirected
        }
    }

    private async getBodyByBodyType(response: Response, responseBodyType: ResponseBodyType): Promise<T | RestBodyType> {
        switch (responseBodyType) {
            case "JSON": 
                return await response.json();
            case "TEXT":
                return await response.text();
            case "ARRAY_BUFFER":
                return await response.arrayBuffer();
            case "BLOB":
                return await response.blob();
            case "BYTES":
                return await response.json();
                // return await response.bytes(); //TODO: fix building error
            case "FORM_DATA":
                return await response.formData();
        }
    }
    
    public async request(url: string, requestOptions?: RequestOptions): Promise<RestResponse<T>> {
        return await this.mapToRestResponse(await this.coreRequest(url, requestOptions), requestOptions?.responseBodyType ?? "JSON");
    }

    public async get(url: string, requestOptions: RequestOptions = {method: "GET", responseBodyType: "JSON"}, delay?: number): Promise<RestResponse<T>> {
        if (delay) {
            await Context.system().wait(delay);
        }
        requestOptions.method = "GET";
        return await this.mapToRestResponse(await this.coreRequest(url, requestOptions), requestOptions?.responseBodyType ?? "JSON");
    }

    public async post(url: string, body?: any, requestOptions: RequestOptions = {method: "POST", responseBodyType: "JSON"}, delay?: number): Promise<RestResponse<T>> {
        if (delay) {
            await Context.system().wait(delay);
        }
        requestOptions.method = "POST";
        requestOptions.body = body;
        return await this.mapToRestResponse(await this.coreRequest(url, requestOptions), requestOptions?.responseBodyType ?? "JSON");
    }

    public async put(url: string, body?: any, requestOptions: RequestOptions = {method: "PUT", responseBodyType: "JSON"}, delay?: number): Promise<RestResponse<T>> {
        if (delay) {
            await Context.system().wait(delay);
        }
        requestOptions.method = "PUT";
        requestOptions.body = body;
        return await this.mapToRestResponse(await this.coreRequest(url, requestOptions), requestOptions?.responseBodyType ?? "JSON");
    }

    public async patch(url: string, body?: any, requestOptions: RequestOptions = {method: "PATCH", responseBodyType: "JSON"}, delay?: number): Promise<RestResponse<T>> {
        if (delay) {
            await Context.system().wait(delay);
        }
        requestOptions.method = "PATCH";
        requestOptions.body = body;
        return await this.mapToRestResponse(await this.coreRequest(url, requestOptions), requestOptions?.responseBodyType ?? "JSON");
    }

    public async delete(url: string, requestOptions: RequestOptions = {method: "DELETE", responseBodyType: "JSON"}, delay?: number): Promise<RestResponse<T>> {
        if (delay) {
            await Context.system().wait(delay);
        }
        requestOptions.method = "DELETE";
        return await this.mapToRestResponse(await this.coreRequest(url, requestOptions), requestOptions?.responseBodyType ?? "JSON");
    }

    public async head(url: string, requestOptions: RequestOptions = {method: "HEAD", responseBodyType: "JSON"}, delay?: number): Promise<RestResponse<T>> {
        if (delay) {
            await Context.system().wait(delay);
        }
        requestOptions.method = "HEAD";
        return await this.mapToRestResponse(await this.coreRequest(url, requestOptions), requestOptions?.responseBodyType ?? "JSON");
    }

    public async options(url: string, requestOptions: RequestOptions = {method: "OPTIONS", responseBodyType: "JSON"}, delay?: number): Promise<RestResponse<T>> {
        if (delay) {
            await Context.system().wait(delay);
        }
        requestOptions.method = "OPTIONS";
        return await this.mapToRestResponse(await this.coreRequest(url, requestOptions), requestOptions?.responseBodyType ?? "JSON");
    }
}

export interface RestResponse<T> {
    statusCode: number;
    statusText: string;
    headers: Headers;
    body: T | RestBodyType;
    ok: boolean;
    redirected: boolean;
}

export declare type RestBodyType = string | ArrayBuffer | Blob | /*Uint8Array<ArrayBuffer> fix building error |*/ FormData;