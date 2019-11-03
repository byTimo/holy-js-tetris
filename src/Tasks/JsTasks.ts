import { CodeTask } from "./Types";

export const jsTask: CodeTask[] = [{
    title: "function sum(a, b) {",
    header: "window.func = function(a, b) {",
    args: [10, 15],
    result: 25,
    lines: [{
        text: "var c = a + b;",
        code: "var c = a + b;"
    }, {
        text: "return c;",
        code: "return c;"
    }, {
        text: "a = a + b;",
        code: "a = a + b;"
    }, {
        text: "return a;",
        code: "return a;"
    }, {
        text: "b = a + b;",
        code: "b = a + b;"
    }, {
        text: "return b;",
        code: "return b;"
    }, {
        text: "var c = a;",
        code: "var c = a;"
    }, {
        text: "return b + c;",
        code: "return b + c;"
    }, {
        text: "var c = b;",
        code: "var c = b;"
    }, {
        text: "return a + c;",
        code: "return a + c;"
    }, {
        text: "var c = 0;",
        code: "var c = 0;"
    }, {
        text: "var c = 1;",
        code: "var c = 1;"
    }, {
        text: "a = 0;",
        code: "a = 0;"
    }, {
        text: "b = 0;",
        code: "b = 0;"
    }, {
        text: "return a + b;",
        code: "return a + b;"
    }]
}, {
    title: "function sum(a) {",
    header: "window.func = function(a) {",
    args: [[1, 2, 3, 4, 5]],
    result: 15,
    lines: [{
        text: "var c = 0;",
        code: "var c = 0;"
    }, {
        text: "var b = 0;",
        code: "var b = 0;"
    }, {
        text: "for(var i = 0; i < a.length; i++) {",
        code: "for(var i = 0; i < a.length; i++) {"
    }, {
        text: "c = c + a[i];",
        code: "c = c + a[i];"
    }, {
        text: "b = b + a[i];",
        code: "b = b + a[i];"
    }, {
        text: "}",
        code: "}"
    }, {
        text: "return c;",
        code: "return c;"
    }, {
        text: "return b;",
        code: "return b;"
    }, {
        text: "var c = 1;",
        code: "var c = 1;"
    }, {
        text: "var b = 1;",
        code: "var b = 1;"
    }, {
        text: "a = a[i];",
        code: "a = a[i];"
    }, {
        text: "c = c + 1;",
        code: "c = c + 1;"
    }, {
        text: "b = b + 1;",
        code: "b = b + 1;"
    }, {
        text: "return a;",
        code: "return a;"
    }, {
        text: "a = 0;",
        code: "a = 0;"
    }]
}]

// [{
//     title: "function factorial(a) {",
//     header: "function func(a) {",
//     args: [5],
//     result: 120,
// }, {
//     title: "function join(a) {",
//     header: "function func(a) {",
//     args: ["a", "b", "c", "d"],
//     result: "abcd",
// }, {
//     title: "function split(a, b) {",
//     header: "function func(a,b) {",
//     args: ["a b c d"],
//     result: ["a", "b", "c", "d"],
// }]