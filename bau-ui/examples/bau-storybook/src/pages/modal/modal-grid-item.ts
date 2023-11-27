import modal from "@grucloud/bau-ui/modal";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any = {}) => {
  const { bau } = context;
  const { form, section, main, header, footer, p, h1 } = bau.tags;

  const Button = button(context);
  const Modal = modal(context, options);

  const Content = () =>
    main(
      Array(20)
        .fill("")
        .map((_, k) => p(k + 1, ". Some text here" /*faker.lorem.paragraph()*/))
    );

  const MyModal = (props: any) => {
    const modalEl = Modal(
      {
        id: `dialog-${props.color}-${props.variant}-${options.size}`,
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

              onclick: () => {
                modalEl.close();
              },
            },
            "Cancel"
          ),
          Button(
            {
              variant: "solid",
              color: props.color,
              onclick: () => {
                modalEl.close();
              },
            },
            "OK"
          )
        )
      )
    );
    return modalEl;
  };

  return (props: any) => {
    const modalEl = MyModal(props);
    return section(
      Button(
        {
          ...props,
          onclick: () => {
            modalEl.showModal();
          },
        },
        "OPEN MODAL"
      ),
      modalEl
    );
  };
};
