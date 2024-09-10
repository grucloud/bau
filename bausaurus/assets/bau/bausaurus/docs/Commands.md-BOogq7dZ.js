const frontmatter = { "title": "Commands" };
const toc = { "children": [{ "value": "Start the development environment", "id": "start-the-development-environment", "level": 2, "children": [] }, { "value": "Build a production website", "id": "build-a-production-website", "level": 2, "children": [] }, { "value": "Preview the production build", "id": "preview-the-production-build", "level": 2, "children": [] }] };
const breadcrumbs = [{ "name": "Commands", "href": "docs/Commands" }];
const paginationNav = { "previous": { "name": "Installation", "href": "docs/Installation" }, "next": { "name": "Configuration", "href": "docs/Configuration" } };
const contentHtml = `<h1 id="commands">Commands</h1>
<p>The workflow consists of 3 npm commands:</p>
<ul>
<li>dev</li>
<li>build</li>
<li>preview</li>
</ul>
<h2 id="start-the-development-environment">Start the development environment</h2>
<p>The <strong>dev</strong> npm command starts a development web server, a browser will be opened automatically.</p>
<pre><code class="language-sh hljs" data-code="npm run dev
" style="position: relative;">npm run dev
</code></pre>
<p>At the stage, every file modified will lead to a refresh of the page</p>
<h2 id="build-a-production-website">Build a production website</h2>
<p>The <strong>build</strong> npm command builds the production website, html pages are generated, that will include the relevant CSS and Javascript.</p>
<pre><code class="language-sh hljs" data-code="npm run build
" style="position: relative;">npm run build
</code></pre>
<pre><code class="language-sh hljs" data-code="✓ 36 modules transformed.
dist/index.html                            0.55 kB │ gzip: 0.36 kB
dist/assets/navBarTree-376faf68.js         0.26 kB │ gzip: 0.16 kB
dist/assets/docs/Styling.md-8ac7db80.js    0.38 kB │ gzip: 0.23 kB
dist/assets/docs/index.md-64c8cc52.js      2.72 kB │ gzip: 0.99 kB
dist/assets/index-df98441b.js              4.79 kB │ gzip: 1.66 kB
dist/assets/docs/Markdown.md-654ea1c4.js   7.47 kB │ gzip: 1.74 kB
dist/assets/utils-021c5fbc.js             20.09 kB │ gzip: 5.88 kB
dist/assets/docAppEntry-bf8caf30.js       21.64 kB │ gzip: 6.31 kB
✓ built in 245ms
" style="position: relative;">✓ 36 modules transformed.
dist/index.html                            0.55 kB │ gzip: 0.36 kB
dist/assets/navBarTree-376faf68.js         0.26 kB │ gzip: 0.16 kB
dist/assets/docs/Styling.md-8ac7db80.js    0.38 kB │ gzip: 0.23 kB
dist/assets/docs/index.md-64c8cc52.js      2.72 kB │ gzip: 0.99 kB
dist/assets/index-df98441b.js              4.79 kB │ gzip: 1.66 kB
dist/assets/docs/Markdown.md-654ea1c4.js   7.47 kB │ gzip: 1.74 kB
dist/assets/utils-021c5fbc.js             20.09 kB │ gzip: 5.88 kB
dist/assets/docAppEntry-bf8caf30.js       21.64 kB │ gzip: 6.31 kB
✓ built in 245ms
</code></pre>
<p>By default, files are generated into the <strong>dist</strong> directory.</p>
<h2 id="preview-the-production-build">Preview the production build</h2>
<p>Before deploying the site, you may want to verify the production website locally.</p>
<p>The <strong>preview</strong> npm command starts a web server and a web browser pointing the production build.</p>
<pre><code class="language-sh hljs" data-code="npm run preview
" style="position: relative;">npm run preview
</code></pre>`;
export {
  breadcrumbs,
  contentHtml,
  frontmatter,
  paginationNav,
  toc
};
