export default function ({ bau, css, tr }) {
  const { h1, h2, div, p, a, em } = bau.tags;

  const className = css`
    grid-area: notfound;
    border: 1px dotted var(--color-emphasis-200);
    padding: 1rem;
    display: flex;
    flex-direction: column;
  `;

  return function NotFound() {
    return div(
      {
        class: className,
      },
      h1(tr("Page Not Found")),
      h2(tr("We could not find what you were looking for.")),
      p("The following location cannot be found: ", em(location.href)),
      p(
        tr(
          "Please contact the owner of the site that linked you to the original URL and let them know their link is broken."
        )
      ),
      p(tr("Take me "), a({ href: location.origin }, tr("Home")))
    );
  };
}
