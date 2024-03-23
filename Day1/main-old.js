console.log("main.js is loaded");

// v1
{
  const root = document.getElementById("root");
  const App = document.createElement("div");
  const testNode = document.createTextNode("APP");

  root.appendChild(App).appendChild(testNode);
}

// v2

{
  const AppElement = {
    type: "text_element",
    props: {
      children: [],
      nodeValue: "APPV2"
    }
  };

  const el = {
    type: "div",
    props: {
      children: [AppElement]
    }
  };

  const rootEl = document.createElement(el.type);
  const root = document.querySelector("#root");
  root.appendChild(rootEl);
  const appEl = document.createTextNode(AppElement.props.nodeValue);
  rootEl.appendChild(appEl);
}

// v3
// ReactDOM.createRoot(document.getElementById("root")).render(<App />)

{
  const createTextNode = (text) => {
    return {
      type: "text_element",
      props: {
        nodeValue: text,
        children: []
      }
    };
  };
  const createElement = (type, props, ...children) => {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) =>
          typeof child === "string" ? createTextNode(child) : child
        )
      }
    };
  };
  const render = (el, container) => {
    const dom =
      el.type === "text_element"
        ? document.createTextNode(el.props.nodeValue)
        : document.createElement(el.type);
    Object.keys(el.props).forEach((key) => {
      if (key !== "children") {
        dom[key] = el.props[key];
      }
    });
    container.appendChild(dom);
    el.props.children.forEach((child) => render(child, dom));
  };

  // ReactDOM.createRoot(document.getElementById("root")).render(<App />)
  const ReactDOM = {
    createRoot: (container) => {
      return {
        render(App) {
          return render(App, container);
        }
      };
    }
  };
  const rootObj = createElement("div", {}, "appV3", "hello");
  ReactDOM.createRoot(document.getElementById("root")).render(rootObj);
}
