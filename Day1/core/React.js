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
export const React = {
  render,
  createElement
};
