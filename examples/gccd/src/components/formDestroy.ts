import { type Context } from "@grucloud/bau-ui/context";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import form from "@grucloud/bau-ui/form";

export default function (context: Context) {
  const { css } = context;
  const Form = form(context);

  const className = css`
    max-width: 500px;
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
    & section {
      display: inline-flex;
    }
  `;

  return function FormDestroy(...args: any[]) {
    let [props, ...children] = toPropsAndChildren(args);
    return Form(
      {
        class: className,
        ...props,
      },
      children
    );
  };
}
