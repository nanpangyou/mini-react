import { it, describe, expect } from "vitest";
import { React } from "../core/React.js";

describe("createElement", () => {
  it("should create a text element", () => {
    const textElement = React.createElement("div", {}, "hello");
    expect(textElement).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hello",
              },
              "type": "text_element",
            },
          ],
        },
        "type": "div",
      }
    `);
    // expect(textElement).toEqual({
    //   type: "div",
    //   props: {
    //     children: [
    //       {
    //         type: "text_element",
    //         props: {
    //           nodeValue: "hello",
    //           children: []
    //         }
    //       }
    //     ]
    //   }
    // });
  });

  it("should create a child", () => {
    const child = React.createElement("div", { id: "idz" }, "hello", "child");
    expect(child).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hello",
              },
              "type": "text_element",
            },
            {
              "props": {
                "children": [],
                "nodeValue": "child",
              },
              "type": "text_element",
            },
          ],
          "id": "idz",
        },
        "type": "div",
      }
    `);
  });
});
