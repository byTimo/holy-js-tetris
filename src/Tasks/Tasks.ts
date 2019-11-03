import { Task } from "./Types";

export const jsTask: Task[] = [{
    title: "function sum(a, b) {",
    header: "function func(a,b) {",
    args: [10, 15],
    result: 25,
}, {
    title: "function sum(a) {",
    header: "function func(a) {",
    args: [[1, 2, 3, 4, 5]],
    result: 15,
}, {
    title: "function factorial(a) {",
    header: "function func(a) {",
    args: [5],
    result: 120,
}, {
    title: "function join(a) {",
    header: "function func(a) {",
    args: ["a", "b", "c", "d"],
    result: "abcd",
}, {
    title: "function split(a, b) {",
    header: "function func(a,b) {",
    args: ["a b c d"],
    result: ["a", "b", "c", "d"],
}]