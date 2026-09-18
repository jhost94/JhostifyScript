import Component from "../../Component";

export default class Div extends Component {
    public static readonly TAG: string = "div";
    
    constructor(parent?: Component) {
        super(Div.TAG, parent);
    }
}