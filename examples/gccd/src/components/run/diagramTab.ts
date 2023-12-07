import rubicox from "rubico/x";
const { isIn } = rubicox;
import { type Context } from "@grucloud/bau-ui/context";

const isCompleted = isIn(["completed", "error"]);

export default function (context: Context) {
  const { bau } = context;
  const { section, img } = bau.tags;

  return function Diagram(props: any) {
    const { data }: any = props;
    return section(
      () =>
        isCompleted(data.val.status) &&
        !data.val.error &&
        img({
          src: data.val.svgUrl,
          alt: "Resources",
        })
    );
  };
}
