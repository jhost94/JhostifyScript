import ExceptionConstants from "./ExceptionConstants";
import GenericException from "./GenericException";

export default class NotImplementedException extends GenericException {

    constructor(item?: string) {
        let msg: string;
        if (item) {
            msg = `${item} is not implemented`;
        } else {
            msg = "Not implemented";
        }

        super(ExceptionConstants.CODE.NOT_IMPLMENTED, msg);
    }
}