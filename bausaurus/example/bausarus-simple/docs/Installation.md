---
title: "Installation"
---

## Grab the boilerplate code

Fetch the boilerplate code and store it for instance at **my-site-doc**:

```sh
npx degit github:grucloud/bau/bausaurus/examples/bausaurus-simple my-site-doc
```

## Install the dependencies

```sh
cd my-site-doc
npm install
```

## Boilerplate content

```txt
├── bausaurus.config.js  - Configure your SSG site.
├── docs                 - Your Markdown files goes here.
├── package.json         - Configure your npm dependencies
├── public               - Store your images and assets in the public directory.
└── src
    ├── appDoc           - support code for the SSG: navigation tree, table of content, breadcrumbs etc ...
    ├── appLanding       - Landing app: a Client Side Rendered web app for your landing page.
    ├── common           - router, styles etc ...
    └── views            - Common components: Header, Footer, NotFound
```
