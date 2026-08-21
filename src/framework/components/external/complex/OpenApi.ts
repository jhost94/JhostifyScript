import Logger from "../../../debug/Logger";
import Component from "../Component";
import Aside from "../basic/formatting/Aside";
import Div from "../basic/formatting/Div";
import Nav from "../basic/formatting/Nav";
import P from "../basic/formatting/P";
import Section from "../basic/formatting/Section";
import Span from "../basic/formatting/Span";
import A from "../basic/link/A";
import H1 from "../basic/text/H1";
import H2 from "../basic/text/H2";
import H3 from "../basic/text/H3";
import Strong from "../basic/text/Strong";

export default class OpenApi extends Component {
    public static readonly OPEN_API_CSS_CLASS: string = "jhostify-open-api";
    public static readonly OPEN_API_OPEN_CSS_CLASS: string = "jhostify-open-api-open";
    public static readonly OPEN_API_SIDEBAR_CSS_CLASS: string = "jhostify-open-api-sidebar";
    public static readonly OPEN_API_CONTENT_CSS_CLASS: string = "jhostify-open-api-content";
    public static readonly OPEN_API_SIDEBAR_TITLE_CSS_CLASS: string = "jhostify-open-api-sidebar-title";
    public static readonly OPEN_API_SIDEBAR_NAV_CSS_CLASS: string = "jhostify-open-api-sidebar-nav";
    public static readonly OPEN_API_CONTENT_SERVICE_CSS_CLASS: string = "jhostify-open-api-content-service";
    public static readonly OPEN_API_CONTENT_SERVICE_DESCRIPTION_CSS_CLASS: string = "jhostify-open-api-content-service";
    public static readonly OPEN_API_CONTENT_VERSION_CSS_CLASS: string = "jhostify-open-api-content-version";
    public static readonly OPEN_API_SIDEBAR_NAV_LINK_CSS_CLASS: string = "jhostify-open-api-sidebar-nav-link";
    public static readonly OPEN_API_CONTENT_TAG_SECTION_CSS_CLASS: string = "jhostify-open-api-content-tag-section";
    public static readonly OPEN_API_CONTENT_TAG_TITLE_CSS_CLASS: string = "jhostify-open-api-content-tag-title";
    public static readonly OPEN_API_CONTENT_TAG_DESCRIPTION_CSS_CLASS: string = "jhostify-open-api-content-tag-description";
    public static readonly OPEN_API_CONTENT_TAG_ENDPOINT_CSS_CLASS: string = "jhostify-open-api-content-tag-endpoint";
    public static readonly OPEN_API_CONTENT_TAG_ENDPOINT_HEADER_CSS_CLASS: string = "jhostify-open-api-content-tag-endpoint-header";
    public static readonly OPEN_API_CONTENT_TAG_METHOD_CSS_CLASS: string = "jhostify-open-api-content-tag-method";
    public static readonly OPEN_API_CONTENT_TAG_PATH_CSS_CLASS: string = "jhostify-open-api-content-tag-path";
    public static readonly OPEN_API_CONTENT_TAG_SUMMARY_CSS_CLASS: string = "jhostify-open-api-content-tag-summary";
    public static readonly OPEN_API_CONTENT_TAG_ARROW_CSS_CLASS: string = "jhostify-open-api-content-tag-arrow";
    public static readonly OPEN_API_CONTENT_TAG_ENDPOINT_BODY_CSS_CLASS: string = "jhostify-open-api-content-tag-endpoint-body";
    public static readonly OPEN_API_CONTENT_TAG_ENDPOINT_DESCRIPTION_CSS_CLASS: string = "jhostify-open-api-content-tag-endpoint-description";
    public static readonly OPEN_API_CONTENT_TAG_ENDPOINT_SECTION_CSS_CLASS: string = "jhostify-open-api-content-tag-endpoint-section";
    public static readonly OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_CSS_CLASS: string = "jhostify-open-api-content-tag-endpoint-parameter";
    public static readonly OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_NAME_CSS_CLASS: string = "jhostify-open-api-content-tag-endpoint-parameter-name";
    public static readonly OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_LOCATION_CSS_CLASS: string = "jhostify-open-api-content-tag-endpoint-parameter-location";
    public static readonly OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_REQUIRED_CSS_CLASS: string = "jhostify-open-api-content-tag-endpoint-parameter-required";
    public static readonly OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_DESCRIPTION_CSS_CLASS: string = "jhostify-open-api-content-tag-endpoint-parameter-description";
    public static readonly OPEN_API_RESPONSE_CSS_CLASS: string = "jhostify-open-api-response";
    public static readonly OPEN_API_RESPONSE_HEADER_CSS_CLASS: string = "jhostify-open-api-response-header";
    public static readonly OPEN_API_RESPONSE_BODY_CSS_CLASS: string = "jhostify-open-api-response-body";
    public static readonly OPEN_API_STATUS_CODE_CSS_CLASS: string = "jhostify-open-api-status-code";
    public static readonly OPEN_API_RESPONSE_DESCRIPTION_CSS_CLASS: string = "jhostify-open-api-response-description";
    public static readonly OPEN_API_SCHEMA_CSS_CLASS: string = "jhostify-open-api-schema";
    public static readonly OPEN_API_SCHEMA_PROPERTY_CSS_CLASS: string = "jhostify-open-api-schema-property";
    public static readonly OPEN_API_SCHEMA_NAME_CSS_CLASS: string = "jhostify-open-api-schema-name";
    public static readonly OPEN_API_SCHEMA_TYPE_CSS_CLASS: string = "jhostify-open-api-schema-type";

    private sidebarNav?: Component;
    private contentDocumentation?: Component;
    private sidebarTitle?: Component;
    private sidebarVersion?: Component;
    private serviceTitle?: Component;
    private serviceDescription?: Component;
    private serviceVersion?: Component;

    constructor(private apiUrl: string) {
        super(Div.TAG);
        this.cssClass(OpenApi.OPEN_API_CSS_CLASS);
        this.children(this.createChildren());
        this.loadOpenAPI();
    }

    private async loadOpenAPI(): Promise<void> {
        //TODO: update for custom rest api caller
        const response = await fetch(this.apiUrl);

        if (!response.ok) {
            Logger.log('ERROR', `Could not load OpenAPI document: ${response.status}`);
            //TODO: show something on html
        }
        //TODO: Use rest API when implemented
        const openAPI = await response.json();
        Logger.log('INFO', [`Loadded `, openAPI]);
        this.renderDocumentation(openAPI);
    }

    private renderDocumentation(json: OpenAPIModel): void {
        this.renderService(json);
        const tags = this.buildTags(json);
        this.renderNavigation(tags);
        this.renderTags(json, tags);
    }

    private renderTags(json: OpenAPIModel, tags: OpenAPITag[]): void {
        if (!this.contentDocumentation) return;

        this.contentDocumentation?.content("");

        for (const tag of tags) {

            //TODO: instead of doing this way, have a way to transmit this ID to where it is needed
            const section = new Section(`tag-${this.slugify(tag.name)}`);
            section.cssClass(OpenApi.OPEN_API_CONTENT_TAG_SECTION_CSS_CLASS);

            const title = new H2();
            title.cssClass(OpenApi.OPEN_API_CONTENT_TAG_TITLE_CSS_CLASS);
            title.content(tag.name);

            section.children().push(title);

            if (tag.description) {
                const description = new Div();
                description.cssClass(OpenApi.OPEN_API_CONTENT_TAG_DESCRIPTION_CSS_CLASS);
                description.content(tag.description);

                section.children().push(description);
            }

            for (const endpoint of tag.operations) {
                section.children().push(this.renderEndpoint(json, endpoint));
            }

            this.contentDocumentation.children().push(section);
        }
    }

    private renderService(api: any): void {
        document.title = api.info?.title ?? "API Documentation";

        this.serviceTitle?.content(api.info?.title ?? "API Documentation");
        this.sidebarTitle?.content(api.info?.title ?? "API");
        this.serviceDescription?.content(api.info?.description ?? "");
        this.serviceVersion?.content(`Version ${api.info?.version ?? "unknown"}`);
        this.sidebarVersion?.content(api.info?.version ?? "");
    }

    private renderEndpoint(json: OpenAPIModel, endpointData: OpenAPITagOperation): Component {
        const { path, method, operation } = endpointData;
        const endpoint = new Div();

        endpoint.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_CSS_CLASS);

        /*
         * Header
         */

        const header = new Div();
        const methodElement = new Span();
        const pathElement = new Span();
        const summary = new Span();
        const arrow = new Span();

        methodElement.cssClass(`${OpenApi.OPEN_API_CONTENT_TAG_METHOD_CSS_CLASS} ${OpenApi.OPEN_API_CONTENT_TAG_METHOD_CSS_CLASS}-${method.toLowerCase()}`);
        methodElement.content(method);
        
        pathElement.cssClass(OpenApi.OPEN_API_CONTENT_TAG_PATH_CSS_CLASS);
        pathElement.content(path);
        
        summary.cssClass(OpenApi.OPEN_API_CONTENT_TAG_SUMMARY_CSS_CLASS);
        summary.content(operation.summary ?? "");
        
        arrow.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ARROW_CSS_CLASS);
        arrow.content("▼");
        
        header.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_HEADER_CSS_CLASS);
        header.children().push(methodElement);
        header.children().push(pathElement);
        header.children().push(summary);
        header.children().push(arrow);

        /*
         * Body
         */

        const body = new Div();

        body.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_BODY_CSS_CLASS);

        /*
         * Description
         */

        if (operation.description) {
            const description = new Div();
            description.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_DESCRIPTION_CSS_CLASS);
            description.content(operation.description);

            body.children().push(description);
        }

        /*
         * Parameters
         */
        if (operation.parameters && operation.parameters.length > 0) {
            const section = this.createSection("Parameters");

            for (const parameter of operation.parameters) {
                section.children().push(this.renderParameter(parameter));
            }

            body.children().push(section);
        }

        /*
         * Request body
         */
        if (operation.requestBody) {
            const section = this.createSection("Request Body");
            section.children().push(this.renderRequestBody(json, operation.requestBody));

            body.children().push(section);
        }

        /*
         * Responses
         */
        if (operation.responses) {
            const section = this.createSection("Responses");

            for (const [status, response] of Object.entries(operation.responses)) {
                section.children().push(this.renderResponse(json, status, response));
            }

            body.children().push(section);
        }

        endpoint.children().push(header);
        endpoint.children().push(body);

        /*
         * Open / close endpoint
         */
        header.onClick(_ => {
            document.getElementById(endpoint.getId())?.classList.toggle(OpenApi.OPEN_API_OPEN_CSS_CLASS);
        });

        return endpoint;
    }

    private renderSchema(api: OpenAPIModel, schema: any): Component {
        const container = new Div();
        container.cssClass(OpenApi.OPEN_API_SCHEMA_CSS_CLASS);

        /*
         * Resolve $ref
         */
        if (schema.$ref) {
            const name = schema.$ref.split("/").pop();
            const resolved = api.components?.schemas?.[name];

            if (resolved) {
                return this.renderSchema(api, resolved);
            }

            container.content(`$ref: ${schema.$ref}`);
            return container;
        }

        /*
         * Primitive
         */
        if (schema.type !== "object") {
            container.content(schema.type ?? "unknown");
            return container;
        }

        /*
         * Object
         */
        for (const [name, property] of Object.entries(schema.properties ?? {})) {
            const row = new Div();
            const propertyName = new Span();
            const propertyType = new Span();

            row.cssClass(OpenApi.OPEN_API_SCHEMA_PROPERTY_CSS_CLASS);
            propertyName.cssClass(OpenApi.OPEN_API_SCHEMA_NAME_CSS_CLASS);
            propertyName.content(name);
            propertyType.cssClass(OpenApi.OPEN_API_SCHEMA_TYPE_CSS_CLASS);
            propertyType.content(` : ${this.getSchemaType(property)}`);

            row.children().push(propertyName);
            row.children().push(propertyType);
            container.children().push(row);
        }

        return container;
    }

    private getSchemaType(schema: any): string {
        if (schema.$ref) {
            return schema.$ref.split("/").pop();
        }
        if (schema.type === "array") {
            return `array<${this.getSchemaType(schema.items)}>`;
        }
        return schema.type ?? "unknown";
    }

    private renderRequestBody(api: OpenAPIModel, requestBody: any): Component {
        const container = new Div();

        if (requestBody.description) {
            const description = new P();
            description.content(requestBody.description);

            container.children().push(description);
        }

        const content = requestBody.content ?? {};

        for (const [mediaType, media] of Object.entries(content)) {
            const title = new Strong();
            title.content(mediaType);

            container.children().push(title);

            if ((media as any).schema) {
                container.children().push(this.renderSchema(api, (media as any).schema));
            }
        }

        return container;
    }

    private renderResponse(api: OpenAPIModel, status: string, response: any): Component {
        const element = new Div();
        const header = new Div();
        const statusCode = new Span();
        const description = new Span();

        element.cssClass(OpenApi.OPEN_API_RESPONSE_CSS_CLASS);
        header.cssClass(OpenApi.OPEN_API_RESPONSE_HEADER_CSS_CLASS);
        statusCode.cssClass(OpenApi.OPEN_API_STATUS_CODE_CSS_CLASS);
        statusCode.content(status);
        description.cssClass(OpenApi.OPEN_API_RESPONSE_DESCRIPTION_CSS_CLASS);
        description.content(response.description ?? "");

        header.children().push(statusCode);
        header.children().push(description);
        element.children().push(header);

        /*
         * Response content
         */
        if (response.content) {
            const body = new Div();

            body.cssClass(OpenApi.OPEN_API_RESPONSE_BODY_CSS_CLASS);

            for (const [mediaType, media] of Object.entries(response.content)) {
                const type = new Div();
                type.content(mediaType);
                //TODO: see if this works
                type.style("\"fontWeight\" =\"bold\";");

                body.children().push(type);

                if ((media as any).schema) {
                    body.children().push(this.renderSchema(api,(media as any).schema));
                }
            }

            element.children().push(body);
        }

        return element;
    }

    private renderParameter(parameter: any): Component {
        const element = new Div();
        element.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_CSS_CLASS);

        const name = new Span();
        name.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_NAME_CSS_CLASS);
        name.content(parameter.name);

        element.children().push(name);

        const location = new Span();
        location.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_LOCATION_CSS_CLASS);
        location.content(parameter.in ?? "");

        element.children().push(location);

        if (parameter.required) {
            const required = new Span();
            required.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_REQUIRED_CSS_CLASS);
            required.content("required");

            element.children().push(required);
        }

        if (parameter.description) {
            const description = new Div();
            description.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_DESCRIPTION_CSS_CLASS);
            description.content(parameter.description);

            element.children().push(description);
        }

        if (parameter.schema) {
            const schema = new Div();
            schema.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_PARAMETER_DESCRIPTION_CSS_CLASS);
            schema.content(`Type: ${parameter.schema.type ?? "object"}`);

            element.children().push(schema);
        }

        return element;
    }

    private createSection(title: string): Component {
        const section = new Div();
        const heading = new H3();

        section.cssClass(OpenApi.OPEN_API_CONTENT_TAG_ENDPOINT_SECTION_CSS_CLASS);
        heading.content(title);

        section.children().push(heading);

        return section;
    }

    private renderNavigation(tags: OpenAPITag[]): void {
        if (!this.sidebarNav) return;
        
        this.sidebarNav.content("");

        for (const tag of tags) {
            const a = new A();
            a.cssClass(OpenApi.OPEN_API_SIDEBAR_NAV_LINK_CSS_CLASS);
            //TODO: this is forcing creating sections with a specific ID
            a.href(`#tag-${this.slugify(tag.name)}`);
            a.content(tag.name);

            this.sidebarNav.children().push(a);
        }
    }

    private slugify(value: string) {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    }

    private buildTags(json: OpenAPIModel): OpenAPITag[] {
        const tags: { [ key in string ]: OpenAPITag } = {};

        /*
         * Explicit OpenAPI tags
         */
        for (const tag of json.tags ?? []) {

            tags[tag.name] = {
                name: tag.name,
                description: tag.description ?? "",
                operations: []
            };
        }


        /*
         * Operations
         */
        for (const [path, pathItem] of Object.entries(json.paths ?? {})) {

            for (const [method, operation] of Object.entries(pathItem)) {

                if (!this.isHttpMethod(method)) {
                    continue;
                }

                const operationTags =
                    operation.tags?.length
                        ? operation.tags
                        : ["default"];


                for (const tagName of operationTags) {

                    if (!tags[tagName]) {

                        tags[tagName] = {
                            name: tagName,
                            description: "",
                            operations: []
                        };
                    }

                    tags[tagName].operations.push({
                        path,
                        method: method.toUpperCase(),
                        operation
                    });
                }
            }
        }

        return Object.values(tags);
    }

    private isHttpMethod(method: string): boolean {
        // TODO: Use list from rest API when implemented
        return [
            "get",
            "post",
            "put",
            "patch",
            "delete",
            "head",
            "options",
            "trace"
        ].includes(method.toLowerCase());
    }

    private createChildren(): Component[] {
        return [this.createSidebar(), this.createContent()];
    }

    private createSidebar(): Component {
        const sidebar = new Aside();
        const titleH1 = new H1();
        const nav = new Nav();
        this.sidebarTitle = new Div();
        this.sidebarVersion = new Span();
        
        sidebar.cssClass(OpenApi.OPEN_API_SIDEBAR_CSS_CLASS);
        this.sidebarTitle.cssClass(OpenApi.OPEN_API_SIDEBAR_TITLE_CSS_CLASS);
        titleH1.content("API"); //TODO: can probably be changed here
        nav.cssClass(OpenApi.OPEN_API_SIDEBAR_NAV_CSS_CLASS);

        this.sidebarTitle.children().push(titleH1);
        this.sidebarTitle.children().push(this.sidebarVersion);

        sidebar.children().push(this.sidebarTitle);
        sidebar.children().push(nav);
        
        return sidebar;
    }

    private createContent(): Component {
        const content = new Div();
        const section = new Section();
        this.serviceTitle = new H1();
        this.serviceDescription = new Div();
        this.serviceVersion = new Span();
        this.contentDocumentation = new Div();

        this.serviceTitle.content("API Documentation");
        content.cssClass(OpenApi.OPEN_API_CONTENT_CSS_CLASS);
        section.cssClass(OpenApi.OPEN_API_CONTENT_SERVICE_CSS_CLASS);
        this.serviceDescription.cssClass(OpenApi.OPEN_API_CONTENT_SERVICE_DESCRIPTION_CSS_CLASS);
        this.serviceVersion.cssClass(OpenApi.OPEN_API_CONTENT_VERSION_CSS_CLASS);

        section.children([this.serviceTitle, this.serviceDescription, this.serviceVersion]);
        content.children([section, this.contentDocumentation]);

        return content;
    }
}

export interface OpenAPIModel {
    openapi: string;
    info: OpenAPIInfo;
    servers: OpenAPIServer[];
    paths: { [key in OpenAPIPathName]: { [key in OpenAPIPathMethod]: OpenAPIMethodDocs } };
    components: OpenAPIComponent;
    tags?: OpenAPITag[];
}

export interface OpenAPIMethodDocs {
    tags: string[];
    summary: string;
    description: string;
    operationId: string;
    parameters: OpenAPIParameter[];
}

export interface OpenAPIParameter {
    name: string;
    in: string;
    description: string;
    required: boolean;
    schema?: any;
}

export interface OpenAPIServer {
    url: string;
}

export interface OpenAPIInfo {
    title: string;
    version: string;
}

export interface OpenAPITag {
    name: string;
    description: string;
    operations: OpenAPITagOperation[];
}

export interface OpenAPITagOperation {
    path: string;
    method: string;
    operation: any;
}

export interface OpenAPIComponent {
    schemas: { [key in string]: { type: string, additionalProperties: any, properties: any } };
}

export type OpenAPIPathName = string;

export type OpenAPIPathMethod = "get" | "post" | "put" | "patch" | "delete" | "head" | "options" | "trace";