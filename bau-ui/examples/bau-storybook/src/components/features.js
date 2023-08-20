export default function (context) {
  const { bau, css } = context;
  const { div, h1, p } = bau.tags;

  const className = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    & .feature {
      border: 1px solid var(--color-emphasis-200);
      box-shadow: var(--shadow-m);
      border-radius: 0.5rem;
      margin: 0.5rem;
      padding: 1rem;
      width: 28%;
      & h1 {
        font-size: 1.1rem;
      }
      & p {
        color: var(--font-color-secondary);
      }
    }
    @media (max-width: 640px) {
      flex-direction: column;
      & .feature {
        width: auto;
      }
    }
  `;

  const Feature = ({ title, Content }) =>
    div({ className: "feature" }, h1(title), p(Content()));

  return function Features({ featuresContent }) {
    return div(
      {
        class: className,
      },
      featuresContent.map(Feature)
    );
  };
}
