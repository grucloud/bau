#!/usr/bin/env node
import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import { writeFile, runCommand } from "./regionsUtils.js";

const { pipe, tap, get, tryCatch, filter, map, pick } = rubico;
const { groupBy, values, callProp } = rubicox;

const filename = "../src/components/infra/azureRegion.json";
// Retrieves the azure regions with 'az account list-locations',
// Transform the result:

// [{
//     displayName: "East US",
//     metadata: {
//       geographyGroup: "US",
//     },
//     name: "eastus",SELECT * FROM job;
//     regionalDisplayName: "(US) East US",
//  }]

// into

//  [
//     {
//       group: "US",
//       regions: [{ name: "eastus", displayName: "East US" }],
//     },
//     {
//       group: "South America",
//       regions: [{ name: "brazilsoutheast", displayName: "Brazil Southeast" }],
//     },
//   ];

const toSelect = pipe([
  tap((regions) => {
    assert(regions);
  }),
  filter(get("metadata.geographyGroup")),
  groupBy(get("metadata.geographyGroup")),
  map.entries(([group, regions]) => [
    group,
    {
      group,
      regions: pipe([
        () => regions,
        map(pick(["displayName", "name"])),
        callProp("sort", (a, b) => a.displayName.localeCompare(b.displayName)),
      ])(),
    },
  ]),
  values,
  tap((regions) => {
    assert(true);
  }),
]);

const listLocations = pipe([
  () => ({
    command: "az account list-locations",
  }),
  runCommand,
]);

tryCatch(
  pipe([
    tap(() => {
      console.log("Azure regions");
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
