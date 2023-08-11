import avatar from "@grucloud/bau-ui/avatar";
import { Context } from "../context";
import componentGrid from "./componentGrid";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, h2, h3 } = bau.tags;
  const avatarClass = css`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `;

  const ComponentGrid = componentGrid(context);

  const Avatar = avatar(context, {
    class: css`
      > img {
        background: var(--color-gray-100);
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
        class: avatarClass,
        src: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",
        alt: "my avatar",
        width: 40,
        height: 40,
      }),
      Avatar({
        class: avatarClass,
        src: "./grucloud.svg",
        alt: "GruCloud",
        width: 40,
        height: 40,
      }),
      Avatar({
        src: "./grucloud.svg",
        alt: "GruCloud",
      }),

      h3("Avatar Table"),
      ComponentGrid({
        Item: (props: any) =>
          Avatar({
            ...props,
            //class: avatarClass,
            src: "./grucloud.svg",
            alt: "GruCloud",
          }),
      })
    );
};
