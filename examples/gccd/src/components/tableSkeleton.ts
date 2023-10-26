import { type Context } from "@grucloud/bau-ui/context";
import skeleton from "@grucloud/bau-ui/skeleton";

export default function (context: Context, options?: any) {
  const { bau, css } = context;
  const { tbody, tr, td } = bau.tags;

  const className = css``;

  const Skeleton = skeleton(context, {
    class: css`
      height: 1rem;
      min-width: 5rem;
    `,
    ...options,
  });

  return function TableSkeleton({ rowSize = 10, columnsSize = 4 }) {
    return tbody(
      {
        class: className,
      },
      new Array(rowSize)
        .fill("")
        .map(() =>
          tr(new Array(columnsSize).fill("").map(() => td(Skeleton())))
        )
    );
  };
}
