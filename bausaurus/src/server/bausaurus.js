import { buildDev } from "./buildDev.js";
import { buildProd } from "./buildProd.js";
import { startPreview } from "./startPreview.js";

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
  .action(({}) => {
    buildDev({ ...program.opts() });
  });

program
  .command("build")
  .description("Build the static website from the markdown files")
  .action(({}) => {
    buildProd({ ...program.opts() });
  });
program
  .command("preview")
  .description("Preview the production build")
  .action(({}) => {
    startPreview({ ...program.opts() });
  });
program.parse();
