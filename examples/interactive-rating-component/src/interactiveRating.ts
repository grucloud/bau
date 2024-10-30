import { type Context } from "@grucloud/bau-ui/context";

const ratingKey = "rating";
const submittedKey = "submitted";

export default function (context: Context) {
  const { bau, css, window } = context;
  const { h1, p, ul, li, button, form, img, picture, section, article, div } =
    bau.tags;

  const className = css`
    max-width: 400px;
    margin: 1rem;
    background-color: var(--clr-dark-700);
    border-radius: 1em;
    .panel {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem;
    }

    h1 {
      margin: 0;
    }
    picture {
      img {
        background-color: var(--clr-dark-500);
        border-radius: 50%;
        padding: 1rem;
      }
    }
    p {
      color: var(--clr-neutral-300);
    }
    ul {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      li {
        list-style: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
        background-color: var(--clr-dark-500);
        color: var(--clr-neutral-300);
        cursor: pointer;

        &:hover {
          background-color: var(--clr-dark-300);
          color: var(--clr-neutral-100);
        }
        &.active {
          color: white;
          background-color: var(--clr-primary);
        }
      }
    }
    button {
      padding: 1rem 0;
      width: 100%;
      border-radius: 1rem;
      border: none;
      cursor: pointer;
      background-color: var(--clr-primary);
      color: var(--clr-neutral-100);
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      transition: all 0.5s;
      &:hover {
        background-color: var(--clr-neutral-100);
        color: var(--clr-primary);
      }
    }

    .thankyou {
      align-items: center;
      h1 {
        font-size: 2rem;
      }
      .badge {
        color: var(--clr-primary);
        background-color: var(--clr-dark-500);
        padding: 0.5rem 1rem;
        border-radius: 1rem;
      }
    }
  `;

  const search = new URLSearchParams(window.location.search);
  const ratingState = bau.state(Number(search.get(ratingKey)));
  const submittedState = bau.state(!!search.get(submittedKey));

  const onRating = (rating: number) => () => {
    const search = new URLSearchParams(window.location.search);
    search.set(ratingKey, String(rating));
    window.history.pushState(
      "",
      "",
      `?${search.toString()}${window.location.hash}`
    );
    ratingState.val = rating;
  };

  const onsubmit = (event: any) => {
    event.preventDefault();
    const search = new URLSearchParams(window.location.search);
    search.set(submittedKey, "true");
    window.history.replaceState(
      "",
      "",
      `?${search.toString()}${window.location.hash}`
    );
    submittedState.val = true;
  };

  const InteractiveRatingContent = () =>
    form(
      { class: "panel", onsubmit },
      picture(img({ src: "./assets/images/icon-star.svg", alt: "star" })),
      h1("How did we do?"),
      p(
        "Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!"
      ),
      ul(
        Array(5)
          .fill("")
          .map((_, i) =>
            li(
              {
                class: () => i + 1 === ratingState.val && "active",
                onclick: onRating(i + 1),
              },
              i + 1
            )
          )
      ),
      button({ type: "submit" }, "Submit")
    );

  const ThankYou = () =>
    section(
      { class: ["thankyou", "panel"] },
      img({
        src: "./assets/images/illustration-thank-you.svg",
        alt: "Thank you",
      }),
      div({ class: "badge" }, "You selected ", ratingState.val, " out of 5"),
      h1("Thank you"),
      p(
        "We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!"
      )
    );

  return function interactiveRating() {
    return article({ class: className }, () =>
      submittedState.val ? ThankYou() : InteractiveRatingContent()
    );
  };
}
