# BauRouter

A Router for the browser in [75 lines of code](./bau-router.js) with the following features:

- Nested route
- Layout support
- Asynchronous loading

_bau-router_ is framework agnostic and integrates with Bau, React, Preact, SolidJs etc ...

## Bundle size

Let's compare the bundle sizes thanks to [bundlephobia](https://bundlephobia.com/):

![bau-router gzip size](https://img.shields.io/bundlephobia/minzip/@grucloud/bau-router.svg?label=@grucloud/bau-router%20gzip%20size)

![universal-router gzip size](https://img.shields.io/bundlephobia/minzip/universal-router.svg?label=@universal-router%20gzip%20size)

![vue-router gzip size](https://img.shields.io/bundlephobia/minzip/vue-router.svg?label=@vue-router%20gzip%20size)

![react-router-dom gzip size](https://img.shields.io/bundlephobia/minzip/react-router-dom.svg?label=@react-router-dom%20gzip%20size)

## Workflow

Install the dependencies:

```sh
npm install @grucloud/bau-router
```

Import `@grucloud/bau-router`

```js
import BauRouter from "@grucloud/bau-router";
```

The following [example](./main.js) demonstrates how to use this router with the [Bau reactive library](https://github.com/grucloud/bau).

## Contribution

Bugs and suggestion can be discussed on its [GitHub project page](https://github.com/grucloud/bau/tree/main/bau-router).
