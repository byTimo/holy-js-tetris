import { CodeTask, CodeTaskLine } from "./Types";
import { jsTask } from "./JsTasks";

export type Languages = "js";

export const tasks: { [T in Languages]: CodeTask[] } = {
    "js": jsTask
}