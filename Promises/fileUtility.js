//import { fstat } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

export function writeToJSONFile(path, data) {
  // TODO
  return writeFile(path, JSON.stringify(data));
}

export function readFromJSONFile(path) {
  // TODO
  return readFile(path).then(res => JSON.parse(res));
}
