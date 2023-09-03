import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { footer } = bau.tags;

  return function ButtonsFooter(...children: any[]) {
    return footer(
      {
        class: css`
          display: flex;
          gap: 1rem;
        `,
      },
      ...children
    );
  };
};
