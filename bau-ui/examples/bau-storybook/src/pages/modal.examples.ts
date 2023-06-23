import modal from "@grucloud/bau-ui/modal";
import button from "@grucloud/bau-ui/button";
//import { faker } from "@faker-js/faker";
import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, main, h2, header, footer, p } = bau.tags;

  const Button = button(context);
  const Modal = modal(context);

  const Content = () =>
    main(
      Array(10)
        .fill("")
        .map((_, k) => p(k + 1, ". " /*faker.lorem.paragraph()*/))
    );

  const modalEl = Modal(
    { id: "my-dialog" },
    header("Header"),
    Content(),
    footer(
      Button(
        {
          onclick: () => {
            modalEl.close();
          },
        },
        "Cancel"
      ),
      Button(
        {
          primary: true,
          raised: true,
          onclick: () => {
            modalEl.close();
          },
        },
        "OK"
      )
    )
  );

  return () =>
    section(
      { id: "modal" },
      h2(tr("Modal Examples")),
      Button(
        {
          raised: true,
          onclick: () => {
            modalEl.showModal();
          },
        },
        "OPEN MODAL"
      ),
      modalEl
    );
};
