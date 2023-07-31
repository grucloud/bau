# @grucloud/bau-astro

This **[Astro integration]** adds [Bau.js](https://github.com/grucloud/bau) to your project so that you can use Bau.js anywhere on your page.

- <strong>[Installation](#installation)</strong>
- <strong>[Usage](#usage)</strong>
- <strong>[Examples](#examples)</strong>

> This is an experimental project, a proof of concept.

## Installation

### Manual Install

First, install the `@grucloud/bau-astro` package using your package manager. If you're using npm or aren't sure, run this in the terminal:

```sh
npm install @grucloud/bau-astro
```

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import bau from "@grucloud/bau-astro";

export default defineConfig({
  // ...
  integrations: [bau()],
});
```

## Usage

Once the integration is installed, you can use [Bau.js](https://github.com/grucloud/bau) in, your Astro project.

## Examples

- The [Bau Astro example](./examples/bau-astro-simple/) shows how to use Bau.js in an Astro project.

## Limitation

- CSS-in-JS such as [bau-css](https://github.com/grucloud/bau/tree/main/bau-css), emotion, styled-components, goober are not supported by Astro, see [issue](https://github.com/withastro/astro/issues/4432)
- client:only is not supported: see [issue](https://github.com/withastro/astro/issues/2526)
