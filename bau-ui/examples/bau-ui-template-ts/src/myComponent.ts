import { type Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default function (context: Context) {
  const { bau, css } = context;
  const { h1, h2, p, article } = bau.tags;

  const className = css`
    margin: 1rem;
    border: 2px dotted var(--color-emphasis-200);
  `;

  const Button = button(context);

  return function myComponent() {
    return article(
      { class: className },
      h1("My Title"),
      h2("My Subtitle"),
      p("My paragraph"),
      Button(
        {
          color: "primary",
          variant: "outline",
          onclick: () => {
            alert("clicked");
          },
        },
        "Click me"
      )
    );
  };
}
