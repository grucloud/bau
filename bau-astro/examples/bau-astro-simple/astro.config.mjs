import { defineConfig } from "astro/config";

import bau from "@grucloud/bau-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [bau()],
});
