import { Context } from "@grucloud/bau-ui/context";
import highligher from "../components/highligher";
// @ts-ignore
import codeEx from "../../../bau-ui-template-js/myComponent";

export default function (context: Context) {
  const { bau, css } = context;
  const { article, h1, p, code, a, ul, li } = bau.tags;

  const Highligher = highligher(context);
  return function GettingStarted() {
    return article(
      {
        class: css`
          background-color: var(--background-color);
          border-bottom: 1px solid var(--color-emphasis-200);
        `,
      },
      h1("Getting Started"),
      p("Grab the source code template for Javascript or Typescript"),
      Highligher({
        text: `npx degit grucloud/bau/bau-ui/examples/bau-ui-template-js my-bau-project`,
      }),
      p("Install the dependencies with the package manager of your choice:"),
      Highligher({
        text: `cd my-bau-project
npm install`,
      }),
      p(
        "This template project is built with Vite. To start a development server:"
      ),
      Highligher({
        text: `npm run dev`,
      }),
      p("The application starting point is at ", code("src/main.ts")),
      p(
        "let's see how to add a ",
        a({ href: "components/button" }, "button component"),
        " , first of all,  import the button:"
      ),
      Highligher({
        text: `import button from "@grucloud/bau-ui/button";`,
      }),
      p(
        "Then, create an instance of this ",
        a({ href: "components/button" }, "button"),
        " by passing the context object:"
      ),
      Highligher({
        text: `const Button = button(context);`,
      }),
      p("Last step is to place the button into the tree of component:"),
      Highligher({
        text: `Button(
{
  color: "primary",
  variant: "outline",
  size:"lg",
  onclick: () => {
    alert("clicked");
  },
},
"Click me"
)`,
      }),
      p(
        "Most components accepts the ",
        a(
          {
            href: "https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",
            target: "_blank",
          },
          "variant"
        ),
        ", ",
        a(
          {
            href: "https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",
            target: "_blank",
          },
          "color"
        ),
        ",  and ",
        a(
          {
            href: "https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",
            target: "_blank",
          },
          "size"
        ),
        ", property."
      ),
      p(
        "Further reading:",
        ul(
          li(a({ href: "components" }, "Visit the component gallery")),
          li(
            a(
              { href: "https://github.com/grucloud/bau", target: "_blank" },
              "Learn more about bau"
            )
          )
        )
      )
    );
  };
}
