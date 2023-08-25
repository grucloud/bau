import tableOfContent from "@grucloud/bau-ui/tableOfContent/tableOfContent.js";

export default function (context) {
  const TableOfContent = tableOfContent(context);

  return function Toc({ contentEl }) {
    return TableOfContent({ contentEl });
  };
}
