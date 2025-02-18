import Objects from "src/utils/Objects";


class Logger {
    private static instance: Logger;

    private static getInstance(): Logger {
        return this.instance;
    }

    private constructor(private loggingLevel: LOGGING_LEVEL = 'ERROR') {
        
    }

    public static init(loggingLevel: LOGGING_LEVEL = 'ERROR') {
        if (Objects.nonNull(this.instance)) throw 'init was already called';
        this.instance = new Logger(loggingLevel);
    }

    public static log(level: LOGGING_LEVEL, log: any, highlight: boolean = false): void {
        if (LoggingTypes.doLogForLevel(this.getInstance().loggingLevel, level)) {
            let formating = this.createLogFormatting(level, highlight);

            if (log instanceof Array) {
                console.log(`%c[${level}]     `, formating, ...log);
            } else {
                console.log(`%c[${level}]     `, formating, log);
            }
        }
    }

    private static createLogFormatting(level: LOGGING_LEVEL, highlight: boolean = false): string {
        let formating = '';

        if (highlight) formating += 'background-color: rgba(255, 255, 0, 0.5); font-size: larger; ';
            
        switch(level) {
            case 'DEBUG':
                formating += 'font-weight: bold; ';
                break;
            case 'ERROR':
                formating += 'color: red; '
                break;
            case 'WARNING': 
            formating += 'color: #CC7000; '
            break;
        }

        return formating;
    }
}

class LoggingTypes {
    private static instance = new LoggingTypes();

    private static getInstance(): LoggingTypes {
        return this.instance;
    }
    
    private loggingLevels: Map<LOGGING_LEVEL, Array<LOGGING_LEVEL>> = new Map();

    private constructor() {
        this.populateLoggingLevels();
    }

    private populateLoggingLevels(): void {
        this.loggingLevels.set('DEBUG', ['DEBUG', 'INFO', 'WARNING', 'ERROR']);
        this.loggingLevels.set('INFO', ['INFO', 'WARNING', 'ERROR']);
        this.loggingLevels.set('WARNING', ['WARNING', 'ERROR']);
        this.loggingLevels.set('ERROR', ['ERROR']);
    }

    public static getForLevel(level: LOGGING_LEVEL): Array<LOGGING_LEVEL> {
        return this.getInstance().loggingLevels.get(level)!;
    }

    /**
     * Verifies if logging type contains logging level.
     * Example:
     *      - type DEBUG contains ERROR -> returns true
     *      - type ERROR does not contain DEBUG -> returns false
     */
    public static doLogForLevel(type: LOGGING_LEVEL, level: LOGGING_LEVEL): boolean {
        return this.getForLevel(type).includes(level);
    }
};

declare type LOGGING_LEVEL = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';

export default Logger

export { LOGGING_LEVEL };