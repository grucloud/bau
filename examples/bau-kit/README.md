# Bau.js Multi Page App Starter Kit under 5Kb

This project implements a _Multi Page App_, all batteries included under **5Kb**, based on the [Bau.js](https://github.com/grucloud/bau) library.

A dependency-free _router_ is also included, featuring nested routes that can be loaded dynamically, reducing the bundling size significantly.

CSS support is provided by [bau-css](https://github.com/grucloud/bau/tree/main/bau-css), a 35 lines css-in-js solution.

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
> vite build

[vite-plugin-virtual-mpa]: Generated virtual files:
<dist>/index.html
<dist>/admin.html
vite v4.3.9 building for production...
✓ 27 modules transformed.
dist/admin.html                            0.70 kB │ gzip: 0.41 kB
dist/index.html                            0.71 kB │ gzip: 0.41 kB
dist/assets/onLocationChange-55f1c9cd.css  1.04 kB │ gzip: 0.49 kB
dist/assets/notFound-6f3918d2.js           0.10 kB │ gzip: 0.11 kB
dist/assets/index-00c3d4a3.js              1.09 kB │ gzip: 0.58 kB
dist/assets/admin-c2bad55b.js              2.15 kB │ gzip: 1.09 kB
dist/assets/onLocationChange-008182f3.js   6.51 kB │ gzip: 3.05 kB
✓ built in 123ms


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
