/**
 * ChatGPT list:
🔹 Serialization / Deserialization
JSON parsing
Stringifying
Handling invalid JSON
Content-Type awareness
⏱ 3. Async & Control Flow
Promises / async-await
Request cancellation (AbortController equivalent)
Timeouts
Retry logic
Debouncing / throttling (optional but useful)
🔐 4. Authentication & Security
🔹 Auth Types
Bearer tokens (JWT)
API keys
Basic auth
Cookies / session-based auth
🔹 Security Concerns
CORS
CSRF
XSS (indirect but relevant)
HTTPS enforcement
📡 5. Advanced HTTP Features
🔹 Headers Management
Custom headers
Content negotiation (Accept, Content-Type)
Caching headers (ETag, Cache-Control)
🔹 Caching
Browser cache interaction
Manual cache layer (optional)
Cache invalidation
🔹 Redirect Handling
Follow redirects automatically or not
🔄 6. Streaming & Progressive Data
🔹 Streaming Responses
Readable streams
Partial data consumption
🔹 File Upload / Download
Progress tracking
Chunked uploads (advanced)
Blob handling
🔌 7. Real-Time Communication
🔹 Server-Sent Events (SSE)
One-way (server → client)
Auto-reconnect
Event parsing
🔹 WebSockets
Full duplex (client ↔ server)
Connection lifecycle:
open
message
error
close
Reconnection strategy
Message serialization
🔹 (Often forgotten) Long Polling
Fallback for real-time systems
🧠 8. Error Handling (CRITICAL)

You must unify:

Network errors (no connection)
HTTP errors (404, 500)
Parsing errors (invalid JSON)
Timeout errors
Aborted requests

👉 These should be distinct but normalized.

🔍 9. Observability / Debugging
Logging requests/responses
Interceptors / middleware
Dev-mode debugging hooks
🔁 10. Interceptors / Middleware Layer

Very powerful concept:

Modify request before sending
Modify response before returning
Handle global errors
Inject auth tokens

Example use cases:

Logging
Retry logic
Auth injection
⚙️ 11. Configuration System
Base URL
Default headers
Timeout defaults
Global interceptors
🔗 12. URL Handling
Query param builder
URL encoding
Route parameter substitution

Example:

/api/users/{id}
🧩 13. Request Composition
Reusable request definitions
API clients (grouped endpoints)
📦 14. Batch Requests (Optional but Advanced)
Multiple requests grouped
Parallel vs sequential execution
🧪 15. Content Negotiation
Accept headers
Handling different response formats
📉 16. Performance Considerations
Request deduplication
Caching
Lazy execution
Rate limiting
🔄 17. Offline Handling (Advanced)
Detect offline state
Queue requests
Retry when back online
🧠 18. State Integration (Future)

Since you're building a UI framework:

How requests tie into UI updates
Loading states
Error states
🔌 19. Platform Abstraction (VERY IMPORTANT FOR YOU)

Since you want:

JS (browser)
Java
C#

You must NOT depend directly on:

fetch
XMLHttpRequest
Browser WebSocket APIs

Instead:

Define something like:

interface HttpClient {
  request(config): Promise<Response>;
}

Then:

Browser → fetch/XHR
Java → HttpClient / OkHttp
C# → HttpClient

Same abstraction.

⚠️ 20. Things People Forget (You Asked For This)

Here are the commonly missed ones:

❗ Abort / cancellation

If you don’t support this early → painful later

❗ Timeouts

Fetch doesn’t support it natively → must implement

❗ Response cloning / multiple reads

Streams can only be read once

❗ SSE reconnection logic

Not optional — required for real usage

❗ WebSocket reconnection + backoff

Critical for stability

❗ Binary data handling

Images, files, etc.

❗ Header normalization (case-insensitive)
❗ Credentials mode

Cookies vs no cookies

❗ Preflight (CORS)

Even if abstracted, you’ll hit it
 */

export default class HttpClient {
    
    private resolveParams(url: string, params?: Map<string, string>): string {
        if (params) {
            url += "?";
            params.forEach((v, k) => {
                url += `${k}=${v}&`;
            });
            return url.substring(0, url.length - 1);
        } else {
            return url;
        }
    }

    protected async coreRequest(url: string, requestOptions?: RequestOptions): Promise<Response> {
        return await fetch(this.resolveParams(url, requestOptions?.params), requestOptions);
    }

}

export type RestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
export type ResponseBodyType = "JSON" | "TEXT" | "ARRAY_BUFFER" | "BLOB" | "BYTES" | "FORM_DATA";
type RequestPriority = "auto" | "high" | "low";

/**
 * TODO: make all this custom
 */
export interface RequestOptions {
    body?: BodyInit | null;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    headers?: HeadersInit;
    integrity?: string
    keepalive?: boolean;
    method?: RestMethod;
    mode?: RequestMode;
    priority?: RequestPriority;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal | null;
    window?: null;
    params?: Map<string, string>;
    responseBodyType?: ResponseBodyType
}

