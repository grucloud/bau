import { css } from "goober";
import { classNames } from "../../utils/classNames";
import IconUpload from "./uploadIcon.svg";
import fileInput from "./fileInput";

export default (context) => {
  const { tr, bau, theme } = context;
  const { palette, shape, shadows } = theme;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");
  const { section, div, h3, h2, span, input } = bau.tags;

  const fileState = bau.state("No file selected");

  const FileInput = fileInput(context);
  const onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      fileState.val = file.name;
    } else {
      fileState.val = "No file selected";
    }
  };
  const FileInputLabel = ({ disabled }) =>
    div(
      {
        class: classNames(
          css`
            display: flex;
            align-items: center;
            flex-direction: column;
            color: ${palette.text.primary};
            > * {
              margin: 1rem;
            }
            svg {
              height: 3rem;
              path {
                fill: ${palette.text.primary};
              }
            }
          `,
          disabled &&
            css`
              color: ${palette.grey[500]};
              svg {
                path {
                  fill: ${palette.grey[500]};
                }
              }
            `
        ),
      },
      svg(use({ href: `#${IconUpload}` })),
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
      })
    );
};
