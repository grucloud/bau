import { fileURLToPath } from "url";
import { resolve, join } from "path";

export const PKG_ROOT = resolve(fileURLToPath(import.meta.url), "../..");
export const DIST_CLIENT_PATH = resolve(PKG_ROOT, "client");
export const APP_PATH = join(DIST_CLIENT_PATH, "app");

export const hashRE = /-(\w+)\.js$/;
export const EXTERNAL_URL_RE = /^[a-z]+:/i;
