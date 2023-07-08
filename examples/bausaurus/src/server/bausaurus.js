import { buildDev } from "./buildDev.js";
import { buildProd } from "./buildProd.js";

import { Command } from "commander";
const program = new Command();

import pkg from "../../package.json" assert { type: "json" };

const optionRootDir = [
  "--root-dir",
  "The root directory, where your bausaurus.config.js is loacated",
  process.cwd(),
];

program
  .name("Bausaurus")
  .description(pkg.description)
  .version(pkg.version)
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
