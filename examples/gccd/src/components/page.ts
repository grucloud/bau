import { type Context } from "@grucloud/bau-ui/context";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import paper from "@grucloud/bau-ui/paper";

export default function (context: Context) {
  const { css } = context;
  const Paper = paper(context);

  const className = css`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > header {
      display: flex;
      gap: 2rem;
      align-items: center;
      & h1 {
        font-weight: 700;
        font-size: 1.3rem;
      }
    }
  `;

  return function Page(...args: any[]) {
    let [props, ...children] = toPropsAndChildren(args);
    return Paper(
      {
        ...props,
        class: className,
      },
      children
    );
  };
}
