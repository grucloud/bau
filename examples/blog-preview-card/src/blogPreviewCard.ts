import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { h1, h3, div, p, article, img, figure, figcaption, span } = bau.tags;

  const className = css`
    border: 1px solid var(--Black);
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    border-radius: 0.6rem;
    background-color: var(--White);
    padding: 1rem;
    box-shadow: 10px 10px;
    img {
      border-radius: 0.6rem;
    }
    .badge {
      background-color: var(--Yellow);
      padding: 0.4rem;
      border-radius: 0.3rem;
      font-size: smaller;
      font-weight: bolder;
    }
    .published-time {
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--Grey);
    }
    figure {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      img {
        width: 36px;
      }
      h3 {
        font-size: 1rem;
        font-weight: bold;
      }
    }
  `;

  return function myComponent() {
    return article(
      { class: className },
      img({ src: "./assets/images/illustration-article.svg" }),
      div(span({ class: "badge" }, "Learning")),
      div({ class: "published-time" }, "Published 21 Dec 2023"),
      h1("HTML & CSS foundations"),
      p(
        "These languages are the backbone of every website, defining structure, content, and presentation."
      ),
      figure(
        img({
          class: "profile-picture",
          src: "./assets/images/image-avatar.webp",
          alt: "Greg Hooper",
        }),
        figcaption(h3("Greg Hooper"))
      )
    );
  };
}
