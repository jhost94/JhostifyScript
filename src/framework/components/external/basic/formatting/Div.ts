import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Div extends Component {
    public static readonly TAG: string = "div";
    
    constructor(parent?: ID) {
        super(Div.TAG, parent);
    }
}