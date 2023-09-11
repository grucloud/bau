import { Sizes } from "@grucloud/bau-ui/constants";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section } = bau.tags;
  return function ComponentSizes({ item }: any) {
    return section(
      {
        class: css`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `,
      },
      Sizes.map((size, index) =>
        item(context, {
          size,
        })({ color: "success", variant: "outline" }, { size, index })
      )
    );
  };
};
