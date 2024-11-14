import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context, {}: any) {
  const { bau, css } = context;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");

  const { section, img, ul, li, button, div, dialog, header } = bau.tags;
  const slideIndex = bau.state(0);
  const className = css`
    --img-width: min(100vw, 440px);

    &.fullscreen {
      --img-width: min(100vw, 450px);
      padding-inline: 3rem;

      & .track {
        & .control {
          display: block;
        }
        & .control-previous {
          transform: translate(-50%, -50%);
        }
        & .control-next {
          transform: translate(50%, -50%);
        }
      }
    }

    & ul {
      list-style: none;
      display: flex;
    }
    & .track {
      position: relative;
      & .control {
        z-index: 1;
        position: absolute;
        padding: 0.5rem;
        cursor: pointer;
        & button {
          background-color: var(--color-emphasis-100);
          width: 3rem;
          height: 3rem;
          font-size: xx-large;
          border-radius: 100%;
          display: grid;
          place-content: center;
          transition: all 0.2s;
          color: var(--color-emphasis-900);
          &:hover {
            color: var(--color-primary);
          }
        }
        @media (min-width: 600px) {
          display: none;
        }
      }
      & .control-previous {
        top: 50%;
        transform: translateY(-50%);
      }
      & .control-next {
        top: 50%;
        transform: translate(-0%, -50%);
        right: 0;
      }

      & .track-inner {
        margin-block: 1rem;

        margin-inline: auto;
        @media (max-width: 600px) {
          margin: 0;
        }
        width: var(--img-width);
        height: var(--img-width);
        overflow: hidden;

        & ul {
          cursor: pointer;
          margin: 0;
          transition: all var(--transition-slow);
          > li {
            & img {
              object-fit: contain;
              border-radius: 0.7rem;
              @media (max-width: 600px) {
                border-radius: 0;
              }
              display: block;
              width: var(--img-width);
              height: var(--img-width);
            }
          }
        }
      }
    }
    & ul.thumbnail {
      display: grid;
      max-width: 550px;
      margin: auto;
      width: var(--img-width);

      @media (max-width: 600px) {
        display: none;
      }
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      place-items: center;
      > li {
        &.active {
          & button {
            outline: 3px solid var(--color-primary);
          }
        }
        & button {
          border-radius: 0.7rem;
          overflow: hidden;
          transition: all 0.2s;
          & img {
            &:hover {
              filter: opacity(50%);
            }
          }
        }
      }
    }
  `;

  return ({ images = [] }: { images: ImageInfo[] }) => {
    const onclickPrevious = () => {
      if (slideIndex.val <= 0) {
        slideIndex.val = images.length - 1;
      } else {
        slideIndex.val--;
      }
    };

    const onclickNext = () => {
      if (slideIndex.val >= images.length - 1) {
        slideIndex.val = 0;
      } else {
        slideIndex.val++;
      }
    };

    const onclickThumbnail = (index: number) => () => {
      slideIndex.val = index;
    };

    const onclickImage = () => {
      const dialogEl = document.getElementById(
        "dialog-carousel"
      ) as HTMLDialogElement;
      dialogEl.showModal();
    };

    const closeDialog = () => {
      const dialogEl = document.getElementById(
        "dialog-carousel"
      ) as HTMLDialogElement;
      dialogEl.close();
    };

    const Carousel = ({
      images,
      fullscreen = false,
    }: {
      images: ImageInfo[];
      fullscreen?: boolean;
    }) =>
      section(
        { class: ["carousel", className, fullscreen && "fullscreen"] },
        div(
          { class: "track" },
          div(
            {
              class: ["control", "control-previous"],
              onclick: onclickPrevious,
            },
            button(
              { role: "previous" },
              svg(
                {
                  width: 12,
                  height: 18,
                  viewBox: "0 0 12 18",
                },
                use({
                  href: `./assets/images/icon-previous.svg#previous`,
                })
              )
            )
          ),
          div(
            {
              class: ["control", "control-next"],
              onclick: onclickNext,
            },
            button(
              { role: "next" },
              svg(
                {
                  width: 13,
                  height: 18,
                  viewBox: "0 0 13 18",
                },
                use({
                  href: `./assets/images/icon-next.svg#next`,
                })
              )
            )
          ),
          div(
            { class: "track-inner" },
            ul(
              {
                style: () =>
                  `transform: translateX(${-100 * slideIndex.val}%);`,
                onclick: onclickImage,
              },
              images.map(({ desktop, alt }) =>
                li(img({ src: desktop, alt, width: 440, height: 440 }))
              )
            )
          )
        ),
        ul(
          { class: "thumbnail" },
          images.map(({ thumbnail, alt }, index) =>
            li(
              { class: () => index == slideIndex.val && "active" },
              button(
                { onclick: onclickThumbnail(index) },
                img({ src: thumbnail, alt, width: 91, height: 91 })
              )
            )
          )
        )
      );

    return [
      Carousel({ images }),
      dialog(
        {
          id: "dialog-carousel",
          //open: true,
          class: css`
            border: none;
            background: none;
            padding: 0;
            inset: 0;
            margin: auto;
            border-radius: 1rem;
            z-index: 10;
            & header {
              display: flex;
              justify-content: flex-end;
              & button[role="close"] {
                padding-right: 3rem;
              }
            }
          `,
        },
        header(button({ role: "close", onclick: closeDialog }, "\u274C")),
        Carousel({ images, fullscreen: true })
      ),
    ];
  };
}
