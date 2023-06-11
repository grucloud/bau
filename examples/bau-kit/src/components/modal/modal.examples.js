import modal from "./modal";
import button from "../button";
//import { faker } from "@faker-js/faker";

export default (context) => {
  const { tr, bau } = context;
  const { section, div, main, h3, h2, header, footer, p } = bau.tags;

  const Button = button(context);
  const Modal = modal(context);

  const Content = () =>
    main(
      Array(10)
        .fill("")
        .map((v, k) => p(k + 1, ". " /*faker.lorem.paragraph()*/))
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
      { id: "modal-examples" },
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
