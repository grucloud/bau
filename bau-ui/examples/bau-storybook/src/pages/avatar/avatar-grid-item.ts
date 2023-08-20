import avatar from "@grucloud/bau-ui/avatar";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { css } = context;

  const Avatar = avatar(context, {
    class: css`
      > img {
        border-radius: 50%;
      }
    `,
  });
  return (props: any) =>
    Avatar({
      ...props,
      src: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",
      alt: "my avatar",
    });
};
