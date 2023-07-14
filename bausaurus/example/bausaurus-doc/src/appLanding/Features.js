export default function (context) {
  const { bau, css } = context;
  const { div, h4, p } = bau.tags;

  const className = css`
    margin: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    & .feature {
      background-color: var(--color-emphasis-50);
      border-radius: 0.5rem;
      margin: 1rem;
      padding: 1rem;
      flex-grow: 1;
      & p {
        color: var(--font-color-secondary);
      }
    }
  `;

  const Feature = ({ title, Content }) =>
    div({ className: "feature" }, h4(title), p(Content()));

  return function Features({ featuresContent }) {
    return div(
      {
        class: className,
      },
      featuresContent.map(Feature)
    );
  };
}
