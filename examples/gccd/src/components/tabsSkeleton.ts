import { type Context } from "@grucloud/bau-ui/context";
import skeleton from "@grucloud/bau-ui/skeleton";

export default function (context: Context, options?: any) {
  const { bau, css } = context;
  const { section, header, span, article } = bau.tags;

  const className = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & header {
      display: inline-flex;
      justify-content: flex-start;
      gap: 1rem;
    }
    & article > div {
      min-height: 600px;
    }
  `;

  const Skeleton = skeleton(context, {
    class: css`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `,
    ...options,
  });

  const SkeletonContent = skeleton(context);

  return function TabsSkeleton({ columnsSize = 4 }) {
    return section(
      {
        class: className,
      },
      header(new Array(columnsSize).fill("").map(() => Skeleton(span("1")))),
      article(SkeletonContent(""))
    );
  };
}
