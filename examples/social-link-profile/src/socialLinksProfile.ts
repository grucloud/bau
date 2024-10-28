import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css } = context;
  const { h1, a, p, article, img, figure, figcaption, ul, li } = bau.tags;

  const LINKS = [
    {
      name: "GitHub",
      href: "https://github.com",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
    },
  ];

  const className = css`
    margin: auto;
    max-width: 700px;
    padding: 1.5rem;
    display: flex;
    max-width: 500px;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: var(--grey-800);
    border-radius: 1rem;
    figure {
      display: flex;
      flex-direction: column;
      .profile-picture {
        width: 96px;
        border-radius: 50%;
        margin: auto;
      }
      figcaption {
        text-align: center;
        .location {
          color: var(--green);
        }
      }
    }
    p {
      text-align: center;
    }
    ul {
      align-self: stretch;
      padding: 0;
      li {
        list-style: none;
        background-color: var(--grey-700);
        border-radius: 0.5rem;
        margin: 1rem 0;
        display: flex;
        a {
          padding: 0.4rem 0;
          width: 100%;
          color: white;
          text-decoration: none;
          font-weight: 500;
          text-align: center;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  `;

  return function myComponent() {
    return article(
      { class: className },
      figure(
        img({
          class: "profile-picture",
          src: "./assets/images/avatar-jessica.jpeg",
          alt: "Jessica Rendal",
        }),
        figcaption(
          h1("Jessica Rendal"),
          p({ class: "location" }, "London United Kingdom")
        )
      ),
      p("Front-end developper and avid reader."),
      ul(LINKS.map(({ name, href }) => li(a({ href }, name))))
    );
  };
}
