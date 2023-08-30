import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, h1, footer } = bau.tags;

  const Button = button(context);

  return function ConfigAws({ onclickPrevious, onclickNext }: any) {
    return section(
      h1("Azure Configuration"),
      footer(
        {
          class: css`
            display: flex;
            gap: 1rem;
          `,
        },
        Button(
          {
            onclick: onclickPrevious,
            variant: "outline",
            color: "primary",
          },
          "Previous"
        ),
        Button(
          {
            onclick: onclickNext,
            variant: "outline",
            color: "primary",
          },
          "Next"
        )
      )
    );
  };
};
