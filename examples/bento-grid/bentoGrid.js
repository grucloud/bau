export default function (context) {
  const { bau, css } = context;
  const { h1, picture, em, img, p, i, strong, article, section } = bau.tags;

  const className = css`
    min-height: 95vh;
    max-width: 900px;
    display: grid;
    gap: 1rem;
    margin: 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "section7 section1 section1 section4"
      "section7 section2 section3 section4"
      "section8 section2 section3 section4"
      "section8 section6 section5 section5";

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-template-areas: "section1" "section2" "section3" "section4" "section5" "section6" "section7" "section8";
    }

    section {
      background-color: var(--clr-white);
      min-height: 100px;
      min-width: 100px;
      border-radius: 0.8rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      overflow: hidden;
      h1 {
      }
      &.section1 {
        grid-area: section1;
        text-align: center;
        background-color: var(--clr-primary-500);
        color: var(--clr-white);
        align-items: center;
        h1 {
          font-size: 2rem;
          strong {
            color: var(--clr-secondary-500);
          }
        }
        img {
          max-width: 200px;
        }
      }
      &.section2 {
        grid-area: section2;
      }

      &.section3 {
        background-color: var(--clr-secondary-500);
        grid-area: section3;
        padding-bottom: 0;
        justify-content: space-between;
        picture {
          max-height: 100px;
          overflow: hidden;
        }
        img {
          max-width: 250px;
        }
      }

      &.section4 {
        grid-area: section4;
        background-color: var(--clr-primary-100);
        display: flex;
        justify-content: center;
        align-items: flex-start;
        @media (max-width: 640px) {
          align-items: center;
        }

        img {
          max-height: 200px;
        }
        p {
          font-size: smaller;
        }
      }
      &.section5 {
        grid-area: section5;
        background-color: var(--clr-primary-500);
        color: var(--clr-white);
        display: flex;
        align-items: center;
        flex-direction: row;
        @media (max-width: 640px) {
          flex-direction: column;
        }
        img {
          max-width: 200px;
          max-height: 200px;
        }
        h1 {
          text-align: center;
        }
      }

      &.section6 {
        grid-area: section6;
        h1 {
          font-size: xx-large;
        }
        img {
          max-width: 300px;
        }
      }

      &.section7 {
        grid-area: section7;
        background-color: var(--clr-secondary-100);
        align-items: center;
        h1 {
          font-size: 1.7rem;
          font-weight: 400;
        }
        img {
          max-width: 150px;
        }
        em {
          color: var(--clr-primary-500);
        }
      }

      &.section8 {
        grid-area: section8;
        background-color: var(--clr-secondary-500);
        h1 {
          font-size: 1.7rem;
          font-weight: 400;
        }
      }
    }
  `;

  return function bentoGrid() {
    return article(
      { class: className },
      section(
        { class: "section1" },
        h1("Social Media ", strong("10x"), i(" Faster"), " with AI"),
        img({
          src: "./assets/images/illustration-five-stars.webp",
        }),
        p("Over 4,000 5-star reviews")
      ),
      section(
        { class: "section2" },
        img({
          src: "./assets/images/illustration-multiple-platforms.webp",
        }),
        h1("Manage multiple accounts and platforms.")
      ),
      section(
        { class: "section3" },
        h1("Maintain a consistent posting schedule."),
        picture(
          img({
            src: "./assets/images/illustration-consistent-schedule.webp",
          })
        )
      ),
      section(
        { class: "section4" },
        h1("Schedule to social media."),
        img({
          src: "./assets/images/illustration-schedule-posts.webp",
        }),
        p(
          "Optimize post timings to publish content at the perfect time for your audience."
        )
      ),
      section(
        { class: "section5" },
        img({
          src: "./assets/images/illustration-grow-followers.webp",
        }),
        h1("Grow followers with non-stop content.")
      ),
      section(
        { class: "section6" },
        h1("> 56%"),
        p("faster audience growth"),
        img({
          src: "./assets/images/illustration-audience-growth.webp",
        })
      ),
      section(
        { class: "section7" },
        h1("Create and schedule content ", em("quicker"), "."),
        img({
          src: "./assets/images/illustration-create-post.webp",
        })
      ),
      section(
        { class: "section8" },
        h1("Write your content using AI."),
        img({
          src: "./assets/images/illustration-ai-content.webp",
        })
      )
    );
  };
}
