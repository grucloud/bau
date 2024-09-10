const frontmatter = { "title": "Introduction" };
const toc = { "children": [] };
const breadcrumbs = [{ "name": "Introduction", "href": "docs/index" }];
const paginationNav = { "next": { "name": "Installation", "href": "docs/Installation" } };
const contentHtml = `<h1 id="introduction">Introduction</h1>
<p><strong>Bausaurus</strong> is Static Site Generator (SSG) built with Bau.</p>
<p>From a directory of files in <strong>markdown</strong> format, it generates html pages where the markdown content is wrapped into a layout:</p>
<ul>
<li>Header</li>
<li>Navigation Tree of the left.</li>
<li>Breadcrumbs navigation above the content.</li>
<li>The content of the markdown converted into HTML</li>
<li>Table of Content for the current file.</li>
<li>Pagination to navigate to the previous and next page.</li>
<li>Footer</li>
</ul>`;
export {
  breadcrumbs,
  contentHtml,
  frontmatter,
  paginationNav,
  toc
};
