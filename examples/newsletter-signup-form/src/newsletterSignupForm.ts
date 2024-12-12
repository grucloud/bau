import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const {
    div,
    form,
    h1,
    p,
    label,
    input,
    button,
    article,
    aside,
    ul,
    li,
    img,
    span,
    strong,
  } = bau.tags;

  const doneState = bau.state(false);
  const emailState = bau.state("");

  const className = css`
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-areas: "form image";
    @media (max-width: 900px) {
      grid-template-areas: "image" "form";
      border-radius: 0;
    }
    padding-inline: 1rem;
    margin-inline: 1rem;
    background-color: var(--White);
    border-radius: 2rem;
    > aside {
      grid-area: image;
      width: 100%;
      & img {
        display: block;
        margin: auto;
        @media (max-width: 900px) {
          background-image: url("./assets/images/illustration-sign-up-mobile.svg");
          background-repeat: no-repeat;
          background-position: center;
          width: 375px;
          height: 284px;
        }
      }
    }
    > form {
      grid-area: form;
      margin: auto;
      padding-inline: 2rem;
      padding-block: 1rem;
      max-width: 500px;
      display: grid;
      gap: 1rem;
      > ul {
        > li {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding-block: 0.3rem;
          position: relative;
          &::before {
            height: 21px;
            width: 21px;
            background-image: url("./assets/images/icon-list.svg");
            content: "";
          }
        }
      }
      & h1 {
        font-size: 2.5rem;
        text-align: center;
      }
      > label {
        display: grid;
        font-size: 0.8rem;
        font-weight: bold;
        gap: 0.5rem;
        > div {
          display: flex;
          justify-content: space-between;
          .error {
            color: var(--color-danger);
            display: none;
          }
        }
        &:has(> input:user-invalid) {
          .error {
            display: block;
            color: var(--color-danger);
          }
        }
        > input {
          height: 56px;
          padding-inline: 1rem;
          border-radius: 0.5rem;
          color: inherit;
          border: 1px solid var(--grey);
          &:focus {
            outline: 1px auto var(--color-primary);
          }
          &:user-invalid {
            outline: 1px auto var(--color-danger);
            background-color: var(--color-danger-lightest);
            color: var(--color-danger);
          }
          &:user-valid {
            outline: 1px auto var(--color-success);
          }
        }
      }
    }
  `;

  const onsubmit = (event: any) => {
    event.preventDefault();
    const { email } = Object.fromEntries(new FormData(event.target));
    emailState.val = String(email);
    doneState.val = true;
  };

  const Thankyou = ({}) =>
    form(
      {
        onsubmit: (event: any) => {
          event.preventDefault();
        },
        class: css`
          background-color: var(--White);
          max-width: 400px;
          padding: 3rem;
          margin-inline: 1rem;
          border-radius: 0.5rem;
          display: grid;
          gap: 2rem;
          & img {
          }
        `,
      },
      img({ src: "./assets/images/icon-success.svg", width: 64, height: 64 }),
      h1("Thanks for subscribing!"),
      p(
        "A confirmation email has been sent to ",
        strong(emailState.val),
        ". Please open it and click the button inside to confirm your subscription."
      ),
      button(
        {
          type: "submit",
          onclick: () => {
            doneState.val = false;
          },
        },
        "Dismiss message"
      )
    );

  const Newsletter = () =>
    article(
      { class: className },
      form(
        { onsubmit },
        h1("Stay updated!"),
        p("Join 60,000+ product managers receiving monthly updates on:"),
        ul(
          li("Product discovery and building what matters"),
          li("Measuring to ensure updates are a success"),
          li("And much more!")
        ),
        label(
          div(
            "Email address",
            span({ class: "error" }, "Valid email required")
          ),
          input({
            name: "email",
            type: "email",
            placeholder: "email@company.com",
            required: true,
          })
        ),
        p(button({ type: "submit" }, "Subscribe to monthly newsletter"))
      ),
      aside(
        img({
          width: 400,
          height: 593,
          src: "./assets/images/illustration-sign-up-desktop.svg",
        })
      )
    );

  return () => {
    return div(() => (doneState.val ? Thankyou({}) : Newsletter()));
  };
}
