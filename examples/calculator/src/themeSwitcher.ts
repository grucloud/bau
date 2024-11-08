import { type Context } from "@grucloud/bau-ui/context";

const themes = ["first", "second", "third"];

export default function (context: Context) {
  const { bau, css, window } = context;
  const { section, span, input, div, label } = bau.tags;

  const className = css`
    display: flex;
    align-items: flex-end;
    gap: 0.4rem;

    > span {
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
    }

    label {
      font-size: 0.6rem;
      cursor: pointer;
    }

    input {
      cursor: pointer;
      appearance: none;
      width: 1.2rem;
      height: 1.2rem;
    }

    .label-container {
      display: flex;
      justify-content: space-around;
    }
    .input-container {
      display: flex;
      position: relative;
      margin-inline: 0.2rem;
      background: var(--secondary-background-color);
      border-radius: 1rem;
      &::before {
        position: absolute;
        content: "";
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
        height: 0.6rem;
        width: 0.6rem;
        border-radius: 50%;
        background-color: var(--ternary-background-color);
        transition: all 0.5s;
      }
      &:has(input[id="second"]:checked) {
        &::before {
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      &:has(input[id="third"]:checked) {
        &::before {
          left: 95%;
          transform: translate(-100%, -50%);
        }
      }
    }
  `;

  const onsubmitTheme = (event: any) => {
    window.document.documentElement.setAttribute("data-theme", event.target.id);
  };

  return () =>
    section(
      {
        class: className,
        onclick: onsubmitTheme,
      },
      span("Theme"),
      div(
        div(
          {
            class: "label-container",
          },
          themes.map((id, index) => label({ htmlFor: id }, index + 1))
        ),
        div(
          {
            class: "input-container",
          },
          themes.map((id) =>
            input({
              type: "radio",
              name: "themeRadio",
              id,
              oninput: onsubmitTheme,
            })
          )
        )
      )
    );
}
