import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { h1, h2, p, article } = bau.tags;

  const className = css`
    margin: 1rem;
    border: 2px dotted grey;
  `;

  return function myComponent() {
    return article(
      { class: className },
      h1("My Title"),
      h2("My Subtitle"),
      p("My paragraph")
    );
  };
}
