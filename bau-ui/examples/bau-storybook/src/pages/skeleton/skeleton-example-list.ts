import skeleton from "@grucloud/bau-ui/skeleton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div } = bau.tags;

  const Skeleton = skeleton(context);
  const ListSkeleton = () =>
    div(
      {
        class: css`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `,
      },
      new Array(4).fill("").map(() =>
        div(
          {
            class: css`
              display: flex;
              gap: 1rem;
              align-items: center;
            `,
          },
          Skeleton({
            class: css`
              border-radius: 100%;
              width: 50px;
              height: 50px;
            `,
          }),
          Skeleton({
            class: css`
              border-radius: 5px;
              width: 100%;
              height: 2rem;
            `,
          })
        )
      )
    );

  return () => section(ListSkeleton());
};
