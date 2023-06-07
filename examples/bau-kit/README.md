# Bau.js Multi Page App Starter Kit under 5Kb

This project implements a _Multi Page App_, all batteries included under **5Kb**, based on the [Bau.js](https://github.com/grucloud/bau) library.

A dependency-free _router_ is also included, featuring nested routes that can be loaded dynamically, reducing the bundling size significantly.

CSS support is provided by [goober](https://goober.js.org/), a less than 1KB css-in-js solution.

Centralized theming for your components, the theme object provides information about the colors, shape, transitions, typography common to your components. See [theme.js](./src/utils/theme.js)

## Multi Page App

For most of the project, a website comes in 3 different forms:

- a landing page for unauthentated user.
- an application for the authenciated user.
- an application for the adminitrator and support people

Instead of creating 3 different repositories, multi page apps allows to use one repository, hence sharing code is as easy as it can get, no more duplications of components, vite configs, themings and so on.

Each app is located at the `src/pages` directory.

A collection of reusable components such as buttons, input, alert is available at [components](components/)

## Workflow

For an enhanced developer experience, this project is built with [Vite](https://vitejs.dev/).

Install the dependencies:

```sh
npm install
```

Start a development server:

```sh
npm run dev
```

Build a production version:

```sh
npm run build
```

```txt
<dist>/index.html
<dist>/admin.html
<dist>/storybook.html
vite v4.3.9 building for production...
✓ 37 modules transformed.
dist/index.html                    0.69 kB │ gzip: 0.40 kB
dist/storybook.html                0.69 kB │ gzip: 0.41 kB
dist/admin.html                    0.76 kB │ gzip: 0.42 kB
dist/assets/router-00fe99d8.css    0.89 kB │ gzip: 0.48 kB
dist/assets/notFound-b8464423.js   0.10 kB │ gzip: 0.11 kB
dist/assets/formLogin-f93433b9.js  0.47 kB │ gzip: 0.32 kB
dist/assets/landing-30eb12da.js    1.02 kB │ gzip: 0.53 kB
dist/assets/admin-2cc5bb6c.js      1.63 kB │ gzip: 0.83 kB
dist/assets/storybook-01f85d43.js  7.50 kB │ gzip: 2.39 kB
dist/assets/router-5c735e0c.js     7.87 kB │ gzip: 3.80 kB
✓ built in 140ms

```

Preview the production version:

```sh
npm run preview
```

Visualize the bundle size:

```sh
npm run bundle-visualizer
```

## Contributions

Please open a bug or feature request at [bau-kit GitHub](https://github.com/grucloud/bau)
