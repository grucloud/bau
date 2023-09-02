import classNames from "@grucloud/bau-css/classNames";
import fileInput from "@grucloud/bau-ui/fileInput";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { tr, bau, css, config } = context;

  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");
  const { div, span } = bau.tags;

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
            gap: 1rem;
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
        use({ href: `${config.base}/uploadIcon.svg#Capa_1` })
      ),
      span(tr("Choose a file to upload"))
    );

  return (props: any) => {
    return FileInput({
      Component: FileInputLabel,
      name: "file",
      accept: "text/*",
      onchange,
      ...props,
    });
  };
};
