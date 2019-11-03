import { Task, Line } from "./Types";
import { jsTask } from "./Tasks";
import { jsLine } from "./JsLines";

export type Languages = "js";

export const tasks: { [T in Languages]: Task[] } = {
    "js": jsTask
}

export const lines: { [T in Languages]: Line[] } = {
    "js": jsLine
}