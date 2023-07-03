export default function ({ bau, css }) {
  const { ul, li, a, nav } = bau.tags;

  const TocItem = ({ value, id, children = [] }) => {
    const link = a({ href: `#${id}` });
    link.innerHTML = value;
    return li(link, children.length > 0 && ul(children.map(TocItem)));
  };

  return function Toc({ toc }) {
    return nav(
      {
        "data-toc": JSON.stringify(toc),
        class: css`
          grid-area: toc;
          border-left: 1px solid var(--color-emphasis-200);
          font-size: 0.9rem;
          margin-right: 1rem;
          list-style: none;
          & ul {
            padding-left: 1rem;
            list-style: none;
          }
          & a {
            text-decoration: none;
            color: var(--color-content-secondary);
            &:hover {
              color: var(--color-content);
              text-decoration: underline;
            }
          }
        `,
      },
      ul(toc.children.map(TocItem))
    );
  };
}
