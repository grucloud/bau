import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { p, label, input, form, i, img, hr, span, section, button } = bau.tags;

  const yearsState = bau.state("--");
  const monthsState = bau.state("--");
  const daysState = bau.state("--");

  const className = css`
    display: grid;
    gap: 0.5rem;
    padding: 2rem;
    border-radius: 1rem 1rem 7rem 1rem;
    background-color: var(--White);
    min-width: 600px;
    @media (max-width: 600px) {
      min-width: unset;
    }
    .dob {
      display: flex;
      gap: 1rem;
      & label {
        display: grid;
        text-transform: uppercase;
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--Smokey-grey);
        letter-spacing: 0.1rem;
        gap: 0.3rem;

        & input {
          @media (min-width: 600px) {
            min-width: 5rem;
          }
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid var(--Light-grey);
          font-size: 1.2rem;
          font-weight: 600;
          &:focus {
            outline: 1px auto var(--color-primary);
          }
        }
      }
    }
    .submit {
      display: flex;
      align-items: center;

      & hr {
        height: 1px;
        background-color: var(--Light-grey);
        border: none;
        width: 100%;
        @media (min-width: 600px) {
          &:last-child {
            display: none;
          }
        }
      }
      & button {
        border: none;
        border-radius: 50%;
        background-color: var(--color-primary);
        cursor: pointer;
        @media (max-width: 600px) {
          img {
            width: 42px;
            height: 42px;
          }
        }
      }
    }

    .age-result {
      font-size: 32px;
      font-weight: 800;
      font-style: italic;
      @media (min-width: 600px) {
        font-size: 60px;
      }
      .timeunit {
        color: var(--color-primary);
      }
    }
  `;

  const onsubmit = (event: any) => {
    event.preventDefault();
    const { day, month, year } = Object.fromEntries(new FormData(event.target));
    console.log(day, month, year);

    const dob = Date.parse(`${year}-${month}-${day}`);
    const now = Date.now();
    let age = (now - dob) / 1000;

    const secondsInYear = 31536000;
    const secondsInMonth = 2628000;
    const secondsInDay = 86400;

    yearsState.val = String(Math.floor(age / secondsInYear));
    let remainingSeconds = age % secondsInYear;

    monthsState.val = String(Math.floor(remainingSeconds / secondsInMonth));
    remainingSeconds %= secondsInMonth;

    daysState.val = String(Math.floor(remainingSeconds / secondsInDay));
  };

  return () => {
    return form(
      { class: className, onsubmit },
      section(
        { class: "dob" },
        label(
          "Day",
          input({
            type: "number",
            name: "day",
            placeholder: "DD",
            min: 1,
            max: 31,
            required: true,
          })
        ),
        label(
          "Month",
          input({
            type: "number",
            name: "month",
            placeholder: "MM",
            min: 1,
            max: 12,
            required: true,
          })
        ),
        label(
          "Year",
          input({
            type: "number",
            name: "year",
            placeholder: "YYYY",
            min: 1900,
            max: new Date().getFullYear(),
            required: true,
          })
        )
      ),
      section(
        { class: "submit" },
        hr(),
        button(
          { type: "submit" },
          img({
            src: "./assets/images/icon-arrow.svg",
            alt: "submit",
            height: 80,
            width: 80,
          })
        ),
        hr()
      ),
      section(
        { class: "age-result" },
        p(span({ class: "timeunit" }, yearsState), i(" years")),
        p(span({ class: "timeunit" }, monthsState), i(" months")),
        p(span({ class: "timeunit" }, daysState), i(" days"))
      )
    );
  };
}
