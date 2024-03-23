# 目标

实现在页面中渲染元素

## 演进步骤

1. 使用原生api实现

```js
{
  const root = document.getElementById("root");
  const App = document.createElement("div");
  const testNode = document.createTextNode("APP");

  root.appendChild(App).appendChild(testNode);
}
```

2. 抽象vdom

```js
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
```

3. 抽象render方法

```js
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
```

最后将v3代码重构一下即可，见react-runner内部

## 如何使用jsx

可使用`vite`将jsx转换为js

使用vite将代码工程化即可

## 新知识点 js pragma

```jsx
// /**@jsx myReact.createElement */
// 上面这行叫pragma，是babel的一个特性，用来告诉babel如何解析jsx语法
import { React } from "./core/React.js";
```
