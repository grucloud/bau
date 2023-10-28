import { type Context } from "@grucloud/bau-ui/context";
import skeleton from "@grucloud/bau-ui/skeleton";

export default function (context: Context, options?: any) {
  const { bau, css } = context;
  const { table, tr, td, span } = bau.tags;

  const className = css``;

  const Skeleton = skeleton(context, {
    class: css`
      min-width: 7rem;
      & span {
        visibility: hidden;
      }
    `,
    ...options,
  });

  return function TableSkeleton({ rowSize = 10, columnsSize = 4 }) {
    return table(
      {
        class: className,
      },
      new Array(rowSize)
        .fill("")
        .map(() =>
          tr(new Array(columnsSize).fill("").map(() => td(Skeleton(span("1")))))
        )
    );
  };
}
