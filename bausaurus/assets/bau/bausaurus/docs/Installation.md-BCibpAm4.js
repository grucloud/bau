const frontmatter = { "title": "Installation" };
const toc = { "children": [{ "value": "Grab the boilerplate code", "id": "grab-the-boilerplate-code", "level": 2, "children": [] }, { "value": "Install the dependencies", "id": "install-the-dependencies", "level": 2, "children": [] }, { "value": "Boilerplate content", "id": "boilerplate-content", "level": 2, "children": [] }] };
const breadcrumbs = [{ "name": "Installation", "href": "docs/Installation" }];
const paginationNav = { "previous": { "name": "Introduction", "href": "docs/index" }, "next": { "name": "Commands", "href": "docs/Commands" } };
const contentHtml = `<h1 id="installation">Installation</h1>
<h2 id="grab-the-boilerplate-code">Grab the boilerplate code</h2>
<p>Fetch the boilerplate code and store it for instance at <strong>my-site-doc</strong>:</p>
<pre><code class="language-sh hljs" data-code="npx degit github:grucloud/bau/bausaurus/example/bausaurus-template my-site-doc
" style="position: relative;">npx degit github:grucloud/bau/bausaurus/example/bausaurus-template my-site-doc
</code></pre>
<h2 id="install-the-dependencies">Install the dependencies</h2>
<pre><code class="language-sh hljs" data-code="cd my-site-doc
npm install
" style="position: relative;">cd my-site-doc
npm install
</code></pre>
<h2 id="boilerplate-content">Boilerplate content</h2>
<pre><code class="language-txt hljs" data-code="├── bausaurus.config.js  - Configure your SSG site.
├── docs                 - Your Markdown files goes here.
├── package.json         - Configure your npm dependencies
├── public               - Store your images and assets in the public directory.
└── src
    ├── appDoc           - support code for the SSG: navigation tree, table of content, breadcrumbs etc ...
    ├── appLanding       - Landing app: a Client Side Rendered web app for your landing page.
    └── views            - Common components: Header, Footer, NotFound
" style="position: relative;">├── bausaurus.config.js  - Configure your SSG site.
├── docs                 - Your Markdown files goes here.
├── package.json         - Configure your npm dependencies
├── public               - Store your images and assets in the public directory.
└── src
    ├── appDoc           - support code for the SSG: navigation tree, table of content, breadcrumbs etc ...
    ├── appLanding       - Landing app: a Client Side Rendered web app for your landing page.
    └── views            - Common components: Header, Footer, NotFound
</code></pre>`;
export {
  breadcrumbs,
  contentHtml,
  frontmatter,
  paginationNav,
  toc
};
