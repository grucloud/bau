import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau } = context;
  const { li, a, span, label } = bau.tags;

  return function KvRepository({ repository_url }: any) {
    //console.assert(repository_url);

    return li(
      label("Repository"),
      span(() =>
        a(
          {
            href: repository_url,
            target: "_blank",
          },
          repository_url
        )
      )
    );
  };
}
