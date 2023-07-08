import assert from "assert";
import rubico from "rubico";
import path from "path";
import fs from "fs/promises";
import { buildDev } from "./buildDev.js";
import { buildProd } from "./buildProd.js";

import { Command } from "commander";
const program = new Command();

const optionRootDir = [
  "--root-dir",
  "The root directory, where your bausaurus.config.js is loacated",
  process.cwd(),
];

program
  .name("Bausaurus")
  .description("Static Site Generation built with Bau")
  .version("0.8.0")
  .option(...optionRootDir);

program
  .command("dev")
  .description("Start a development environment")
  .action(({}, options) => {
    buildDev({ ...program.opts() });
  });

program
  .command("build")
  .description("Build the static website from the markdown files")
  .action(({}, options) => {
    buildProd({ ...program.opts() });
  });
program.parse();
