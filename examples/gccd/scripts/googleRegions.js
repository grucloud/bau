#!/usr/bin/env node
import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import { writeFile, runCommand } from "./regionsUtils.js";

const { pipe, tap, get, tryCatch, filter, eq, map, pick } = rubico;
const { pluck, callProp } = rubicox;

const filename = "../src/components/infra/googleRegion.json";
// Retrieves the google cloud regions with 'gcloud compute regions list --format=json',

const toSelect = pipe([
  tap((regions) => {
    assert(regions);
  }),
  filter(eq(get("status"), "UP")),
  pluck("name"),
  callProp("sort", (a, b) => a.localeCompare(b)),
  tap((regions) => {
    assert(true);
  }),
]);

const listLocations = pipe([
  () => ({
    command: "gcloud compute regions list --format=json",
  }),
  runCommand,
]);

tryCatch(
  pipe([
    tap(() => {
      console.log("Google Cloud regions");
    }),
    listLocations,
    JSON.parse,
    toSelect,
    writeFile({ filename }),
  ]),
  (error) => {
    console.error(error);
    process.exit(-1);
  }
)();
