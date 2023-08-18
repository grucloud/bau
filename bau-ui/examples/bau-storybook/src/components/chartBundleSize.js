export default function ({ tr, bau, css }) {
  const { article, dl, dt, dd, div, aside, footer, a } = bau.tags;

  const Row =
    ({ maxSize = 151 }) =>
    ({ libName, size }) =>
      div(
        {
          class: css`
            display: flex;
            margin: 0.3rem;
          `,
        },
        dt(
          {
            class: css`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `,
          },
          libName
        ),
        dd(
          {
            class: css`
              display: flex;
              align-items: center;
              width: 100%;
              margin: 0 1rem;
            `,
          },
          div(
            {
              class: css`
                display: flex;
                color: var(--font-color-inverse);
                background-image: linear-gradient(
                  247deg,
                  var(--color-danger) 0%,
                  var(--color-success) ${(size / maxSize) * 100}%
                );
                justify-content: flex-end;
                width: ${(size / maxSize) * 100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `,
            },
            size
          )
        )
      );

  return function ChartBundleSize({ data = [] }) {
    return article(
      {
        class: css`
          box-shadow: var(--shadow-m);
          border: 1px solid var(--color-emphasis-200);
          padding: 1rem;
        `,
      },
      aside(
        {
          class: css`
            text-align: center;
            font-size: 1.5rem;
            font-weight: 500;
          `,
        },
        "Bundle Size Comparison in kB"
      ),
      dl(
        {
          class: css`
            display: flex;
            flex-direction: column;
          `,
        },
        data.map(Row({}))
      ),
      footer(
        {
          class: css`
            text-align: center;
          `,
        },
        "The bundle size corresponds to a simple application with a dozen components. ",
        a(
          {
            href: "https://github.com/FredericHeem/component-library-bundle-size",
          },
          "How is it measured?"
        )
      )
    );
  };
}
