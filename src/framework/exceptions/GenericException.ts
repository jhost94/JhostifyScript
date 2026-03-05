export default class GenericException extends Error {
    
    constructor(private code: string, private msg: string) {
        super(msg);
    }
}
