import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { h1, form, span, p, label, input, div, button, textarea } = bau.tags;

  const className = css`
    padding: 1rem;
    margin: 1rem;
    border-radius: 0.5rem;
    background-color: var(--white);
    & h1 {
      font-size: 1.3rem;
    }
    & p {
      margin-block: 0.8rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .radio-label-group {
      width: 100%;
      > div {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
    & textarea {
      height: 4rem;
      padding: 0.2rem;
    }
    @media (max-width: 600px) {
    }
  `;

  const onsubmit = (event: any) => {
    event.preventDefault();
    const result = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(result));
  };

  return () => {
    return form(
      { class: className, onsubmit },
      h1("Contact Us"),
      p(
        label(
          span("First Name"),
          input({ type: "text", name: "firstName", required: true, size: 32 })
        ),
        label(
          span("Last Name"),
          input({ type: "text", name: "lastName", required: true, size: 32 })
        )
      ),
      p(
        label(
          span("Email"),
          input({ type: "email", name: "email", required: true })
        )
      ),
      p(
        label(
          { class: "radio-label-group" },
          span("Query Type"),
          div(
            label(
              input({ type: "radio", name: "GeneralInquiry", required: true }),
              "General Inquiry"
            ),
            label(
              input({ type: "radio", name: "GeneralInquiry" }),
              "Support Request"
            )
          )
        )
      ),
      p(label(span("Message"), textarea({ required: true }))),
      p(
        label(
          input({ type: "checkbox", required: true }),
          span("I consent being contacted by the team")
        )
      ),

      button({ type: "submit" }, "Submit")
    );
  };
}
