export default function ({ bau, css }) {
  const { ul, li, a, nav } = bau.tags;

  const className = css`
    grid-area: toc;
    position: sticky;
    top: calc(var(--header-height) + 1rem);
    align-self: start;
    border-left: 1px solid var(--color-emphasis-200);
    font-size: 0.8rem;
    margin-right: 1rem;
    list-style: none;
    & ul {
      padding-left: 1rem;
      list-style: none;
    }
    & li {
      margin: 0.5rem;
    }
    & a {
      text-decoration: none;
      color: var(--color-content-secondary);
      &:hover {
        color: var(--color-primary-darkest);
        text-decoration: underline;
      }
    }
  `;

  const TocItem = ({ value, id, children = [] }) => {
    const link = a({ href: `#${id}` });
    link.innerHTML = value;
    return li(link, children.length > 0 && ul(children.map(TocItem)));
  };

  return function Toc({ toc }) {
    return nav(
      {
        "data-toc": JSON.stringify(toc),
        class: className,
      },
      toc?.children && ul(toc.children.map(TocItem))
    );
  };
}
