const frontmatter = { "title": "Configuration" };
const toc = { "children": [] };
const breadcrumbs = [{ "name": "Configuration", "href": "docs/Configuration" }];
const paginationNav = { "previous": { "name": "Commands", "href": "docs/Commands" }, "next": { "name": "Markdown", "href": "docs/Markdown" } };
const contentHtml = `<h1 id="configuration">Configuration</h1>
<p>The configuration file is called <strong>bausaurus.config.js</strong>, its content allows to specify how the web site will be generated.</p>
<pre><code class="language-js hljs" data-code="import { App } from &quot;./src/appDoc/App.js&quot;;

export default ({ rootDir }) => {
  return {
    docApp: App,
    viteConfig: {
      base: &quot;/&quot;,
      build: { outDir: &quot;dist/&quot; },
    },
    site: {
      rootDir,
      srcDir: &quot;docs&quot;,
      title: &quot;My super duper website&quot;,
      description: &quot;A description of your website&quot;,
      keywords: [&quot;Some tags&quot;, &quot;My Other Tags&quot;],
      lang: &quot;en&quot;,
      favicon: &quot;/my-logo.svg&quot;,
      base: &quot;/docs/&quot;,
      outDir: &quot;dist/docs&quot;,
    },
  };
};
" style="position: relative;"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">App</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./src/appDoc/App.js"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ({ rootDir }) =&gt; {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">docApp</span>: <span class="hljs-title class_">App</span>,
    <span class="hljs-attr">viteConfig</span>: {
      <span class="hljs-attr">base</span>: <span class="hljs-string">"/"</span>,
      <span class="hljs-attr">build</span>: { <span class="hljs-attr">outDir</span>: <span class="hljs-string">"dist/"</span> },
    },
    <span class="hljs-attr">site</span>: {
      rootDir,
      <span class="hljs-attr">srcDir</span>: <span class="hljs-string">"docs"</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">"My super duper website"</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">"A description of your website"</span>,
      <span class="hljs-attr">keywords</span>: [<span class="hljs-string">"Some tags"</span>, <span class="hljs-string">"My Other Tags"</span>],
      <span class="hljs-attr">lang</span>: <span class="hljs-string">"en"</span>,
      <span class="hljs-attr">favicon</span>: <span class="hljs-string">"/my-logo.svg"</span>,
      <span class="hljs-attr">base</span>: <span class="hljs-string">"/docs/"</span>,
      <span class="hljs-attr">outDir</span>: <span class="hljs-string">"dist/docs"</span>,
    },
  };
};
</code></pre>`;
export {
  breadcrumbs,
  contentHtml,
  frontmatter,
  paginationNav,
  toc
};
