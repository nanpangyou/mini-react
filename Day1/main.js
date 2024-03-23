import { ReactDOM } from "./core/ReactDom.js";
import { React } from "./core/React.js";
const rootObj = React.createElement("div", {}, "appV3", "hello");
ReactDOM.createRoot(document.getElementById("root")).render(rootObj);
