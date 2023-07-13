---
title: "Commands"
---

The workflow consists of 3 npm commands:

- dev
- build
- preview

## Start the development environment

The **dev** npm command starts a development web server, a browser will be opened automatically.

```sh
npm run dev
```

At the stage, every file modified will lead to a refresh of the page

## Build a production website

The **build** npm command builds the production website, html pages are generated, that will include the relevant CSS and Javascript.

```sh
npm run build
```

```sh
✓ 36 modules transformed.
dist/index.html                            0.55 kB │ gzip: 0.36 kB
dist/assets/navBarTree-376faf68.js         0.26 kB │ gzip: 0.16 kB
dist/assets/docs/Styling.md-8ac7db80.js    0.38 kB │ gzip: 0.23 kB
dist/assets/docs/index.md-64c8cc52.js      2.72 kB │ gzip: 0.99 kB
dist/assets/index-df98441b.js              4.79 kB │ gzip: 1.66 kB
dist/assets/docs/Markdown.md-654ea1c4.js   7.47 kB │ gzip: 1.74 kB
dist/assets/utils-021c5fbc.js             20.09 kB │ gzip: 5.88 kB
dist/assets/docAppEntry-bf8caf30.js       21.64 kB │ gzip: 6.31 kB
✓ built in 245ms
```

By default, files are generated into the **dist** directory.

## Preview the production build

Before deploying the site, you may want to verify the production website locally.

The **preview** npm command starts a web server and a web browser pointing the production build.

```sh
npm run preview
```
