import modal from "@grucloud/bau-ui/modal";
import button from "@grucloud/bau-ui/button";
import { Context } from "../context";
import componentGrid from "./componentGrid";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, main, h2, header, footer, p, div } = bau.tags;

  const ComponentGrid = componentGrid(context);

  const Button = button(context);
  const Modal = modal(context);

  const Content = () =>
    main(
      Array(10)
        .fill("")
        .map((_, k) => p(k + 1, ". Some text here" /*faker.lorem.paragraph()*/))
    );

  const MyModal = (props: any) => {
    const modalEl = Modal(
      { id: "my-dialog", ...props },
      header("Header"),
      Content(),
      footer(
        Button(
          {
            variant: "outline",
            onclick: () => {
              modalEl.close();
            },
          },
          "Cancel"
        ),
        Button(
          {
            variant: "solid",
            onclick: () => {
              modalEl.close();
            },
          },
          "OK"
        )
      )
    );
    return modalEl;
  };

  const modalEl = MyModal({});

  return () =>
    section(
      { id: "modal" },
      h2(tr("Modal Examples")),
      Button(
        {
          variant: "solid",
          onclick: () => {
            modalEl.showModal();
          },
        },
        "OPEN MODAL"
      ),
      modalEl,
      h2(tr("Modal Table")),
      ComponentGrid({
        Item: (props: any) => {
          const modalEl = MyModal(props);
          return div(
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
        },
      })
    );
};
