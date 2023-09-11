#!/usr/bin/env node
import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import { writeFile, runCommand } from "./regionsUtils.js";

const { pipe, tap, get, tryCatch } = rubico;
const { pluck, callProp } = rubicox;

const filename = "../src/components/infra/awsRegion.json";
// Retrieves the aws regions with 'aws ec2 describe-regions --region us-east-1 --profile default --output json',
// Transform the result:

// {
// "Regions": [
//   {
//       "Endpoint": "ec2.ap-south-1.amazonaws.com",
//       "RegionName": "ap-south-1",
//       "OptInStatus": "opt-in-not-required"
//   }
// ],
//

// into

//  [
//  "ap-south-1", "eu-north-1"
//   ];

const toSelect = pipe([
  tap((regions) => {
    assert(regions);
  }),
  get("Regions"),
  pluck("RegionName"),
  callProp("sort", (a, b) => a.localeCompare(b)),
  tap((regions) => {
    assert(true);
  }),
]);

const listLocations = pipe([
  () => ({
    command:
      "aws ec2 describe-regions --region us-east-1 --profile default --output json",
  }),
  runCommand,
]);

tryCatch(
  pipe([
    tap(() => {
      console.log("Aws regions");
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
