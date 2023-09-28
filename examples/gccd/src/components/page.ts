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
    & h1 {
      font-weight: 700;
      font-size: 1.3rem;
      line-height: 1.4rem;
    }
    & h2 {
      font-weight: 600;
      font-size: 1.2rem;
      line-height: 1.3rem;
    }
    & header {
      display: flex;
      gap: 2rem;
      align-items: center;
      justify-content: space-between;
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
