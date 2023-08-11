import fileInput from "@grucloud/bau-ui/fileInput";
import classNames from "@grucloud/bau-css/classNames";
import componentGrid from "./componentGrid";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");
  const { section, div, h3, h2, span } = bau.tags;

  const ComponentGrid = componentGrid(context);

  const fileState = bau.state("No file selected");
  const FileInput = fileInput(context);
  const onchange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      fileState.val = file.name;
    } else {
      fileState.val = "No file selected";
    }
  };
  const FileInputLabel = ({ disabled }: any) =>
    div(
      {
        class: classNames(
          css`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,
          disabled &&
            css`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `
        ),
      },
      svg(
        { width: 100, height: 100, fill: "currentColor" },
        use({ href: `uploadIcon.svg#Capa_1` })
      ),
      span(tr("Choose a file to upload"))
    );

  return () =>
    section(
      { id: "fileInput" },
      h2(tr("FileInput Examples")),
      h3("File Input"),
      FileInput({
        Component: FileInputLabel,
        name: "file",
        accept: "text/*",
        onchange,
      }),
      div("File selected: ", fileState),
      h3("File Input disabled"),
      FileInput({
        Component: FileInputLabel,
        name: "file",
        accept: "text/*",
        disabled: true,
        onchange,
      }),
      h3("File Input Table"),
      ComponentGrid({
        Item: (props: any) => {
          return FileInput({
            Component: FileInputLabel,
            name: "file",
            accept: "text/*",
            onchange,
            ...props,
          });
        },
      })
    );
};
