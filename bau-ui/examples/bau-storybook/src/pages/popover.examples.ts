import popover from "@grucloud/bau-ui/popover";
import button from "@grucloud/bau-ui/button";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h3, h2, h1, p } = bau.tags;
  const Button = button(context);
  const Container = (...children: any[]) =>
    div(
      {
        class: css`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `,
      },
      ...children
    );

  const Popover = popover(context);

  const MyTrigger = () => Button({ primary: true, raised: true }, "Click");

  const MyContent = () => div({}, h1("My content"), p("My Content"));

  return () =>
    section(
      {
        id: "popover",
        class: css``,
      },
      h2(tr("Popover")),
      h3("Basic Popover"),
      Container(
        Popover({
          id: "my-popover-left",
          Trigger: MyTrigger,
          Content: MyContent,
        }),
        Popover({
          id: "my-popover-right",
          Trigger: MyTrigger,
          Content: MyContent,
        })
      )
    );
};
