import modal from "@grucloud/bau-ui/modal";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any = {}) => {
  const { bau, window } = context;
  const { document } = window;
  const { form, section, main, header, footer, p, h1 } = bau.tags;

  const Button = button(context);
  const Modal = modal(context, options);

  const Content = () =>
    main(
      Array(20)
        .fill("")
        .map((_, k) => p(k + 1, ". Some text here" /*faker.lorem.paragraph()*/))
    );
  const getDialogId = (props: any) =>
    `dialog-${props.color}-${props.variant}-${options.size}`;

  const MyModal = (props: any) =>
    Modal(
      {
        id: getDialogId(props),
        ...props,
      },
      form(
        header(h1("Header")),
        Content(),
        footer(
          Button(
            {
              variant: "outline",
              color: props.color,
              onclick: (event: any) => {
                event.target.closest("dialog").close();
              },
            },
            "Cancel"
          ),
          Button(
            {
              variant: "solid",
              color: props.color,
              onclick: (event: any) => {
                event.target.closest("dialog").close();
              },
            },
            "OK"
          )
        )
      )
    );

  return (props: any) => {
    return section(
      Button(
        {
          ...props,
          onclick: () => {
            const dialogEl = document.getElementById(
              getDialogId(props)
            ) as HTMLDialogElement;
            dialogEl.showModal();
          },
        },
        "OPEN MODAL"
      ),
      MyModal(props)
    );
  };
};
