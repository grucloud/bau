import { type Context } from "@grucloud/bau-ui/context";
import { type State } from "@grucloud/bau";
import { navLink } from "./navLinks";

const dialogCartId = "dialog-cart";
const drawerId = "drawer";

export const header = (
  context: Context,
  { cartState }: { cartState: State<CartItem[]> }
) => {
  const { bau, css } = context;
  const { header, div, img, button, span, dialog, form } = bau.tags;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");

  const itemCount = bau.derive(() =>
    cartState.val.reduce((acc, { quantity }) => (acc += quantity), 0)
  );

  const Links = navLink(context);
  const Drawer = () =>
    dialog(
      {
        id: drawerId,
        //open: true,
        // Close when click outside.
        onclick: ({ target, currentTarget }: any) => {
          if (target == currentTarget) {
            target.close();
          }
        },
        class: css`
          padding: 1rem;
          min-width: 200px;
          & > form {
            & > nav {
              margin-block: 2rem;
              & > ul {
                gap: 1rem;
                flex-direction: column;
                > li {
                  padding-bottom: 0.3rem;
                  & a {
                    color: var(--font-color-base);
                    font-weight: bold;
                    font-size: 1rem;
                  }
                }
              }
            }
          }
        `,
      },
      form(
        header(
          button({ role: "close", onclick: toogleDialog(drawerId) }, "\u274C")
        ),
        Links({
          onclick: toogleDialog(drawerId),
        })
      )
    );

  const className = css`
    position: sticky;
    align-self: start;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: stretch;
    background-color: var(--background-color);
    padding-inline: 1rem;
    border-bottom: 1px solid var(--color-emphasis-200);
    gap: 2rem;
    & .header-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      & button.burger {
        display: none;
        padding: 1rem;
        @media (max-width: 600px) {
          display: inline-flex;
        }
      }
      flex-grow: 0;
    }
    & > nav {
      display: flex;
      @media (max-width: 600px) {
        display: none;
      }
      align-items: stretch;
      & ul {
        align-items: stretch;
        gap: 1.5rem;
        padding: 0;

        > li {
          display: flex;
          align-items: center;
          position: relative;
          &::after {
            content: "";
            transition: all 0.4s;
            background-color: transparent;
            position: absolute;
            bottom: 0;
            left: 0;
            height: 4px;
            width: 100%;
          }
          &:hover {
            &::after {
              content: "";
              background-color: var(--color-primary);
            }
          }
          > a {
            color: var(--color-emphasis-700);
            &:hover {
              font-weight: bolder;
            }
            font-size: 0.9rem;
          }
        }
      }
    }

    .header-right {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 2rem;
      margin-block: 1rem;
      & button[aria-label="cart"] {
        position: relative;
        color: var(--color-emphasis-700);
      }
      & img.avatar {
        transition: all 0.2s;
        &:hover {
          outline: 3px solid var(--color-primary);
        }
        border-radius: 100%;
      }
    }
  `;

  const toogleDialog = (id: string) => () => {
    const dialogEl = document.getElementById(id) as HTMLDialogElement;
    if (!dialogEl.open) {
      dialogEl.showModal();
    } else {
      dialogEl.close();
    }
  };

  return () => [
    Drawer(),
    header(
      { class: className },
      div(
        { class: "header-left" },
        button(
          {
            "aria-label": "menu",
            class: "burger",
            onclick: toogleDialog(drawerId),
          },
          img({
            src: "./assets/images/icon-menu.svg",
            alt: "Menu",
            width: 15,
            height: 15,
          })
        ),
        img({
          class: "logo",
          src: "./assets/images/logo.svg",
          alt: "Logo",
          width: 138,
          height: 20,
        })
      ),
      Links({}),
      div(
        { class: "header-right" },
        button(
          { "aria-label": "cart", onclick: toogleDialog(dialogCartId) },
          svg(
            {
              width: 22,
              height: 20,
              viewBox: "0 0 22 22",
              fill: "currentColor",
            },
            use({
              href: `./assets/images/icon-cart.svg#cart`,
            })
          ),
          () =>
            itemCount.val > 0 && span({ class: ["badge", "solid"] }, itemCount)
        ),
        button(
          img({
            class: "avatar",
            src: "./assets/images/image-avatar.png",
            alt: "Logo",
            width: 55,
            height: 55,
          })
        )
      )
    ),
  ];
};
