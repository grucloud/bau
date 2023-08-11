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

  const TriggerButton = () =>
    Button(
      {
        onclick: () =>
          popoverEl.open ? popoverEl.closeDialog() : popoverEl.openDialog(),
      },
      "Click"
    );

  const triggerEl = TriggerButton();
  const Content = () => div({}, h1("My content"), p("My Content"));
  const contentEl = Content();
  const popoverEl = Popover({
    id: "my-popover-left",
    triggerEl,
    contentEl,
  });

  const triggerElRight = Button(
    {
      onclick: () =>
        popoverElRight.open
          ? popoverElRight.closeDialog()
          : popoverElRight.openDialog(),
    },
    "Click"
  );
  const contentRight = Content();

  const popoverElRight = Popover({
    id: "my-popover-left",
    triggerEl: triggerElRight,
    contentEl: contentRight,
  });

  return () =>
    section(
      {
        id: "popover",
        class: css``,
      },
      h2(tr("Popover")),
      h3("Basic Popover"),
      Container(
        div(triggerEl, popoverEl),
        div(triggerElRight, popoverElRight)

        // div(
        //   triggerEl,
        //   Popover({
        //     id: "my-popover-right",
        //     triggerEl,
        //     contentEl,
        //   })
        // )
      )
    );
};
