import assert from "assert";
import rubico from "rubico";
import { spawn } from "child_process";
import fs from "fs/promises";
import Path from "path";

const { pipe, tap } = rubico;

export const runCommand = ({ command }) =>
  new Promise((resolve, reject) => {
    let result = "";
    const child = spawn(command, {
      shell: true,
      detached: true,
      env: { PATH: process.env.PATH },
    });
    child.stderr.on("data", (x) => {
      console.error(x.toString());
    });
    child.stdout.on("data", (x) => {
      result += x.toString();
    });
    child.on("error", (code) => {
      console.error("Error running", command, "code: ", code);
      reject(code);
    });
    child.on("exit", (code) => {
      if (code !== 0) {
        reject(code);
      } else {
        resolve(result);
      }
    });
  });

export const writeFile =
  ({ filename }) =>
  (json) =>
    pipe([
      () => Path.resolve(filename),
      tap((filenameResolved) => {
        console.log("Write to", filenameResolved);
      }),
      (filenameResolved) =>
        fs.writeFile(filenameResolved, JSON.stringify(json, null, 2)),
    ])();
