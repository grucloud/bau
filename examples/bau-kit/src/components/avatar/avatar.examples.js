import avatar from "./avatar";
import { css } from "goober";

export default (context) => {
  const { tr, bau, theme } = context;
  const { palette } = theme;
  const { section, h2 } = bau.tags;

  const Avatar = avatar(context, {
    cssOverride: css`
      > img {
        background: ${palette.grey[100]};
        border-radius: 50%;
        margin: 0.3rem;
      }
    `,
  });

  return () =>
    section(
      { id: "avatar" },
      h2(tr("Avatar")),
      Avatar({
        src: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",
        alt: "my avatar",
        width: 40,
        height: 40,
      }),
      Avatar({
        src: "https://www.grucloud.com/img/cloud.svg",
        alt: "GruCloud",
        width: 40,
        height: 40,
      })
    );
};
