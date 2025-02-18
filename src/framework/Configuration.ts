import Objects from "../utils/Objects.js";
import Page from "./components/Page.js";
import InternalPage from "./components/internal/InternalPage.js";
import DefaultValues from "./constants/DefaultValues.js";
import { LOGGING_LEVEL } from "./debug/Logger.js";
import ElementVendor from "./requirements/ElementVendor.js";

class InitialConfiguration {
    private defaultConfiguration: Configuration;
    private config: Configuration;
    private elementBuilder?: ElementVendor;

    constructor(private defaultElementBuilder: ElementVendor, configOptions?: ConfigurationOptions) {
        this.defaultConfiguration = this.buildDefaultConfig(this.defaultElementBuilder);
        this.config = this.buildConfig(this.defaultConfiguration, configOptions);
    }

    public getConfig(): Configuration {
        return this.config;
    }

    //TODO create getAsString, etc...
    public get(name: keyof Configuration): Configuration[keyof Configuration] {
        return this.config[name];
    }

    public set(name: keyof Configuration, value: any): void {
        if (Objects.diferentType(this.get(name), value)) throw "Diferent type of config value";
        this.config[name] = value;
    }
    
    public getElementBuilder(): ElementVendor {
        return this.elementBuilder ?? this.defaultElementBuilder;
    }


    private buildDefaultConfig(defaultElementBuilder: ElementVendor): Configuration {
        const ele = defaultElementBuilder.createElement(DefaultValues.DEFAULT_PAGE_ID);
        const notFoundEle = defaultElementBuilder.createElement(DefaultValues.NOT_FOUND_PAGE_ID);
        return this.defaultConfiguration = { 
            notFoundPage: new InternalPage(notFoundEle, DefaultValues.NOT_FOUND_PAGE_ID),
            defaultPage: new InternalPage(ele, DefaultValues.DEFAULT_PAGE_ID),
            defaultPageName: DefaultValues.DEFAULT_PAGE_ID,
            elementBuilder: defaultElementBuilder,
            logLevel: 'ERROR'
        }
    }

    private buildConfig(defaultConfig: Configuration, configOptions?: ConfigurationOptions): Configuration {
        const eleBuilder = configOptions?.elementBuilder ?? defaultConfig.elementBuilder;
        const defaultPage = configOptions && configOptions.defaultPage ?  
            new InternalPage(eleBuilder.createElement(configOptions?.defaultPage?.getName()), configOptions?.defaultPage?.getName()) 
            : defaultConfig.defaultPage;
        const notFoundPage = configOptions && configOptions.defaultPage ?  
            new InternalPage(eleBuilder.createElement(configOptions?.notFoundPage?.getName()), configOptions?.notFoundPage?.getName()) 
            : defaultConfig.defaultPage;
        
        if (configOptions?.defaultPage) {
            defaultPage.get().innerHTML = configOptions.defaultPage.getTemplate(); //TODO this is a quickfix, needs permanent solution~
        }

        return {
            notFoundPage: notFoundPage,
            defaultPage: defaultPage,
            defaultPageName: configOptions?.notFoundPage?.getName() ?? defaultConfig.defaultPageName,
            elementBuilder: eleBuilder,
            logLevel: configOptions?.logLevel ?? defaultConfig.logLevel
        }
    }
}

interface Configuration {
    notFoundPage: InternalPage,
    defaultPage: InternalPage,
    defaultPageName: string,
    elementBuilder: ElementVendor,
    logLevel: LOGGING_LEVEL
}

interface ConfigurationOptions {
    notFoundPage: Page,
    defaultPage?: Page,
    defaultPageName?: string,
    elementBuilder?: ElementVendor,
    logLevel?: LOGGING_LEVEL
}

export default InitialConfiguration;
export { Configuration, ConfigurationOptions };