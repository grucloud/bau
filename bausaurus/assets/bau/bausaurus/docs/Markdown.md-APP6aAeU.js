const frontmatter = { "title": "Markdown" };
const toc = { "children": [{ "value": "Note", "id": "note", "level": 2, "children": [{ "value": "Input", "id": "input", "level": 3, "children": [] }, { "value": "Output", "id": "output", "level": 3, "children": [] }] }, { "value": "Syntax highlighter", "id": "syntax-highlighter", "level": 2, "children": [{ "value": "Shell command", "id": "shell-command", "level": 3, "children": [{ "value": "Input", "id": "input", "level": 4, "children": [] }, { "value": "Output", "id": "output", "level": 4, "children": [] }] }, { "value": "Source Code", "id": "source-code", "level": 3, "children": [{ "value": "Input", "id": "input", "level": 4, "children": [] }, { "value": "Output", "id": "output", "level": 4, "children": [] }] }, { "value": "Inline Source Code", "id": "inline-source-code", "level": 3, "children": [{ "value": "Input", "id": "input", "level": 4, "children": [] }, { "value": "Output", "id": "output", "level": 4, "children": [] }] }] }, { "value": "Table", "id": "table", "level": 2, "children": [{ "value": "Input", "id": "input", "level": 3, "children": [] }, { "value": "Output", "id": "output", "level": 3, "children": [] }] }, { "value": "Links", "id": "links", "level": 2, "children": [{ "value": "Input", "id": "input", "level": 3, "children": [] }, { "value": "Output", "id": "output", "level": 3, "children": [] }] }, { "value": "Embed HTML", "id": "embed-html", "level": 2, "children": [{ "value": "Input", "id": "input", "level": 3, "children": [] }, { "value": "Output", "id": "output", "level": 3, "children": [] }] }] };
const breadcrumbs = [{ "name": "Markdown", "href": "docs/Markdown" }];
const paginationNav = { "previous": { "name": "Configuration", "href": "docs/Configuration" } };
const contentHtml = `<h1 id="markdown">Markdown</h1>
<p>The Markdown format allows to write content with a simple syntax.</p>
<h2 id="note">Note</h2>
<p>Example of note:</p>
<h3 id="input">Input</h3>
<pre><code class="language-sh hljs" data-code="> A note starts with the > symbol
" style="position: relative;"><span class="hljs-meta prompt_">&gt; </span>A note starts with the &gt; symbol
</code></pre>
<h3 id="output">Output</h3>
<blockquote>
<p>A note starts with the &gt; symbol</p>
</blockquote>
<h2 id="syntax-highlighter">Syntax highlighter</h2>
<p>The code syntax highligh feature is provided thanks to the <a href="https://highlightjs.org/">highlight.js</a> library.</p>
<h3 id="shell-command">Shell command</h3>
<p>Example of shell command:</p>
<h4 id="input">Input</h4>
<pre><code class="language-sh hljs" data-code="\`\`\`sh
$ rm -rf /
\`\`\`
" style="position: relative;">\`\`\`sh
<span class="hljs-meta prompt_">$ </span>rm -rf /
\`\`\`
</code></pre>
<h4 id="output">Output</h4>
<pre><code class="language-sh hljs" data-code="$ rm -rf /
" style="position: relative;"><span class="hljs-meta prompt_">$ </span>rm -rf /
</code></pre>
<h3 id="source-code">Source Code</h3>
<p>Example of Javascript code:</p>
<h4 id="input">Input</h4>
<pre><code class="language-sh hljs" data-code="\`\`\`js
exports.createResources = () => [
  {
    type: &quot;Topic&quot;,
    group: &quot;SNS&quot;,
    name: &quot;my-topic&quot;,
    properties: ({}) => ({
      Attributes: {
        DisplayName: &quot;My Topic&quot;,
      },
    }),
  },
];
\`\`\`
" style="position: relative;">\`\`\`js
exports.createResources = () =&gt; [
  {
    type: "Topic",
    group: "SNS",
    name: "my-topic",
    properties: ({}) =&gt; ({
      Attributes: {
        DisplayName: "My Topic",
      },
    }),
  },
];
\`\`\`
</code></pre>
<h4 id="output">Output</h4>
<pre><code class="language-js hljs" data-code="exports.createResources = () => [
  {
    type: &quot;Topic&quot;,
    group: &quot;SNS&quot;,
    name: &quot;my-topic&quot;,
    properties: ({}) => ({
      Attributes: {
        DisplayName: &quot;My Topic&quot;,
      },
    }),
  },
];
" style="position: relative;"><span class="hljs-built_in">exports</span>.<span class="hljs-property">createResources</span> = <span class="hljs-function">() =&gt;</span> [
  {
    <span class="hljs-attr">type</span>: <span class="hljs-string">"Topic"</span>,
    <span class="hljs-attr">group</span>: <span class="hljs-string">"SNS"</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">"my-topic"</span>,
    <span class="hljs-attr">properties</span>: <span class="hljs-function">(<span class="hljs-params">{}</span>) =&gt;</span> ({
      <span class="hljs-title class_">Attributes</span>: {
        <span class="hljs-title class_">DisplayName</span>: <span class="hljs-string">"My Topic"</span>,
      },
    }),
  },
];
</code></pre>
<h3 id="inline-source-code">Inline Source Code</h3>
<h4 id="input">Input</h4>
<pre><code class="language-txt hljs" data-code="One can use \`inline code\` with backtick
" style="position: relative;">One can use \`inline code\` with backtick
</code></pre>
<h4 id="output">Output</h4>
<p>One can use <code>inline code</code> with backtick</p>
<h2 id="table">Table</h2>
<h3 id="input">Input</h3>
<pre><code class="language-txt hljs" data-code="|                                            | GruCloud | Terraform | AWS CDK |
| ------------------------------------------ | -------- | --------- | ------- |
| Generate code from existing infrastructure | Yes      | No        | No      |
| General-purpose language                   | Yes      | No        | Yes     |
| Multi-cloud                                | Yes      | Yes       | No      |
" style="position: relative;">|                                            | GruCloud | Terraform | AWS CDK |
| ------------------------------------------ | -------- | --------- | ------- |
| Generate code from existing infrastructure | Yes      | No        | No      |
| General-purpose language                   | Yes      | No        | Yes     |
| Multi-cloud                                | Yes      | Yes       | No      |
</code></pre>
<h3 id="output">Output</h3>
<table>
<thead>
<tr>
<th></th>
<th>GruCloud</th>
<th>Terraform</th>
<th>AWS CDK</th>
</tr>
</thead>
<tbody>
<tr>
<td>Generate code from existing infrastructure</td>
<td>Yes</td>
<td>No</td>
<td>No</td>
</tr>
<tr>
<td>General-purpose language</td>
<td>Yes</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Multi-cloud</td>
<td>Yes</td>
<td>Yes</td>
<td>No</td>
</tr>
</tbody>
</table>
<h2 id="links">Links</h2>
<h3 id="input">Input</h3>
<pre><code class="language-sh hljs" data-code="- [Commands](./Commands.md)
" style="position: relative;">- [Commands](./Commands.md)
</code></pre>
<h3 id="output">Output</h3>
<ul>
<li><a href="./Commands.md">Commands</a></li>
</ul>
<h2 id="embed-html">Embed HTML</h2>
<p>Any HTML content can be inserted into the Markdown file, for instance, an <em>iframe</em>:</p>
<h3 id="input">Input</h3>
<pre><code class="language-html hljs" data-code="<iframe
      title=&quot;gc new&quot;
      data-autoplay
      src=&quot;https://asciinema.org/a/daLrxnF4qNuuUksSugIBjmi2F/iframe?autoplay=true&amp;amp;speed=2&amp;amp;loop=true&quot;
      id=&quot;asciicast-iframe-13761&quot;
      name=&quot;asciicast-iframe-13761&quot;
      scrolling=&quot;no&quot;
      style=&quot;width: 100%;height: 500px&quot;>
    </iframe>
</div>
" style="position: relative;"><span class="hljs-tag">&lt;<span class="hljs-name">iframe</span>
      <span class="hljs-attr">title</span>=<span class="hljs-string">"gc new"</span>
      <span class="hljs-attr">data-autoplay</span>
      <span class="hljs-attr">src</span>=<span class="hljs-string">"https://asciinema.org/a/daLrxnF4qNuuUksSugIBjmi2F/iframe?autoplay=true<span class="hljs-symbol">&amp;amp;</span>speed=2<span class="hljs-symbol">&amp;amp;</span>loop=true"</span>
      <span class="hljs-attr">id</span>=<span class="hljs-string">"asciicast-iframe-13761"</span>
      <span class="hljs-attr">name</span>=<span class="hljs-string">"asciicast-iframe-13761"</span>
      <span class="hljs-attr">scrolling</span>=<span class="hljs-string">"no"</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%;height: 500px"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h3 id="output">Output</h3>
<div>
    <iframe title="gc new" data-autoplay="" src="https://asciinema.org/a/daLrxnF4qNuuUksSugIBjmi2F/iframe?autoplay=true&amp;speed=2&amp;loop=true" id="asciicast-iframe-13761" name="asciicast-iframe-13761" scrolling="no" style="width: 100%;height: 500px"></iframe></div>
`;
export {
  breadcrumbs,
  contentHtml,
  frontmatter,
  paginationNav,
  toc
};
