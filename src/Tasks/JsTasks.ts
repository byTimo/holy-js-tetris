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
}, {
    title: "function min(a) {",
    header: "window.func = function(a) {",
    args: [[5, 4, 10, 40, 0]],
    result: 0,
    lines: [{
        text: "var b = Number.MAX_VALUE;",
        code: "var b = Number.MAX_VALUE;"
    }, {
        text: "var c = Number.MAX_VALUE;",
        code: "var c = Number.MAX_VALUE;"
    }, {
        text: "var b = 1;",
        code: "var b = 1;"
    }, {
        text: "var с = 1;",
        code: "var с = 1;"
    }, {
        text: "for(var i = 0; i < a.length; i++) {",
        code: "for(var i = 0; i < a.length; i++) {"
    }, {
        text: "c = 0;",
        code: "c = 0;"
    }, {
        text: "b = a[i];",
        code: "b = a[i];"
    }, {
        text: "b = b > a[i] ? b : a[i];",
        code: "b = b > a[i] ? b : a[i];"
    }, {
        text: "c = c > a[i] ? c : a[i];",
        code: "c = c > a[i] ? c : a[i];"
    }, {
        text: "c = c <= a[i] ? c : a[i];",
        code: "c = c <= a[i] ? c : a[i];"
    }, {
        text: "b = b <= a[i] ? b : a[i];",
        code: "b = b <= a[i] ? b : a[i];"
    }, {
        text: "c = a[i];",
        code: "c = a[i];"
    }, {
        text: "if(b > a[i]) {",
        code: "if(b > a[i]) {"
    }, {
        text: "if(b <= a[i]) {",
        code: "if(b <= a[i]) {"
    }, {
        text: "if(c > a[i]) {",
        code: "if(c > a[i]) {"
    }, {
        text: "if(c <= a[i]) {",
        code: "if(c <= a[i]) {"
    }, {
        text: "}",
        code: "}"
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
        text: "return a[i];",
        code: "return a[i];"
    },]
}, {
    title: "function count(a) {",
    header: "window.func = function(a) {",
    args: [[1, 2, 5, 6, 10, -12, 3]],
    result: 7,
    lines: [{
        text: "var b = 0;",
        code: "var b = 0;"
    }, {
        text: "var c = 0;",
        code: "var c = 0;"
    }, {
        text: "var c = 1;",
        code: "var c = 1;"
    }, {
        text: "var b = 1;",
        code: "var b = 1;"
    }, {
        text: "return b;",
        code: "return b;"
    }, {
        text: "return c;",
        code: "return c;"
    }, {
        text: "for(var i = 0; i < a.length; i++) {",
        code: "for(var i = 0; i < a.length; i++) {"
    }, {
        text: "}",
        code: "}"
    }, {
        text: "c++;",
        code: "c++;"
    }, {
        text: "c = c + 1;",
        code: "c = c + 1;"
    }, {
        text: "b = b + 1;",
        code: "b = b + 1;"
    }, {
        text: "return b;",
        code: "return b;"
    }, {
        text: "return c;",
        code: "return c;"
    },]
}, {
    title: "function max(a) {",
    header: "window.func = function(a) {",
    args: [[-1, -10, 0, -100]],
    result: 0,
    lines: [{
        text: "var b = Number.MIN_VALUE;",
        code: "var b = Number.MIN_VALUE;"
    }, {
        text: "var c = Number.MIN_VALUE;",
        code: "var c = Number.MIN_VALUE;"
    }, {
        text: "var b = 1;",
        code: "var b = 1;"
    }, {
        text: "var с = 1;",
        code: "var с = 1;"
    }, {
        text: "for(var i = 0; i < a.length; i++) {",
        code: "for(var i = 0; i < a.length; i++) {"
    }, {
        text: "c = 0;",
        code: "c = 0;"
    }, {
        text: "b = a[i];",
        code: "b = a[i];"
    }, {
        text: "b = b > a[i] ? b : a[i];",
        code: "b = b > a[i] ? b : a[i];"
    }, {
        text: "c = c > a[i] ? c : a[i];",
        code: "c = c > a[i] ? c : a[i];"
    }, {
        text: "c = c <= a[i] ? c : a[i];",
        code: "c = c <= a[i] ? c : a[i];"
    }, {
        text: "b = b <= a[i] ? b : a[i];",
        code: "b = b <= a[i] ? b : a[i];"
    }, {
        text: "c = a[i];",
        code: "c = a[i];"
    }, {
        text: "if(b > a[i]) {",
        code: "if(b > a[i]) {"
    }, {
        text: "if(b <= a[i]) {",
        code: "if(b <= a[i]) {"
    }, {
        text: "if(c > a[i]) {",
        code: "if(c > a[i]) {"
    }, {
        text: "if(c <= a[i]) {",
        code: "if(c <= a[i]) {"
    }, {
        text: "}",
        code: "}"
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
        text: "return a[i];",
        code: "return a[i];"
    },]
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