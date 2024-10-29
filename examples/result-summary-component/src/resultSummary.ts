import { type Context } from "@grucloud/bau-ui/context";
import data from "./data.json";

export default function (context: Context) {
  const { bau, css } = context;
  const { h1, h2, div, p, article, section, button, ul, li, span, img } =
    bau.tags;
  const className = css`
    max-width: 500px;
    margin: auto;
    display: grid;
    grid-template-columns: minmax(auto, 350px) minmax(auto, 350px);
    grid-template-rows: 1fr;

    @media (max-width: 500px) {
      grid-template-columns: 1fr;

      border-radius: 0;
    }
    border-radius: 0.6rem;
    box-shadow: 0 0.5rem 2rem 0 rgba(0, 0, 0, 0.1);
    section {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 0.7rem;
      &.result {
        align-items: center;
        border-radius: 0.6rem;
        @media (max-width: 600px) {
          flex-direction: column;
          border-radius: 0 0 0.6rem 0.6rem;
        }
        background: linear-gradient(
          var(--Light-slate-blue),
          var(--Light-royal-blue)
        );

        min-width: 250px;

        h1 {
          color: var(--color);
        }
        h2 {
          color: var(--white);
        }
        p {
          color: var(--color);
          text-align: center;
          padding: 0 1rem;
        }
        .score-container {
          color: var(--white);
          background: linear-gradient(var(--Violet-blue), var(--Persian-blue));
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 50%;
          aspect-ratio: 1;
          padding: 1.5rem;
          .score {
            color: var(--white);
            font-size: 3rem;
            font-weight: bold;
            line-height: 3rem;
          }
          .score-total {
            font-size: 0.7rem;
            color: var(--color);
          }
        }
      }
      &.summary {
        min-width: 250px;
        button {
          width: 100%;
          font-weight: 500;
          font-size: 1rem;
          padding: 0.6rem 0;
          color: white;
          border-radius: 1rem;
          background-color: var(--btn-bg);
          border: none;
          outline: none;
          cursor: pointer;
          &:hover {
            background: linear-gradient(
              var(--Light-slate-blue),
              var(--Light-royal-blue)
            );
          }
        }
      }
      ul {
        padding: 0;
        flex-grow: 1;
        li {
          list-style: none;
          padding: 0.7rem 0.5rem;
          margin: 0.5rem 0rem;
          border-radius: 0.3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:nth-child(1) {
            color: hsl(0, 100%, 67%);
            background: hsla(0, 100%, 67%, 0.05);
          }
          &:nth-child(2) {
            color: hsl(39, 100%, 56%);
            background: hsla(39, 100%, 56%, 0.05);
          }
          &:nth-child(3) {
            color: hsl(166, 100%, 37%);
            background: hsla(166, 100%, 37%, 0.05);
          }
          &:nth-child(4) {
            color: hsl(234, 85%, 45%);
            background: hsla(234, 85%, 45%, 0.05);
          }
          .category {
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }
          .category {
            font-weight: 700;
          }
          .score {
            color: hsl(224, 30%, 27%);
            font-weight: 700;
            padding-right: 0.3rem;
          }
          .score-total {
            color: hsla(224, 30%, 27%, 0.5);
          }
        }
      }
    }
  `;

  return function resultSummary() {
    return article(
      { class: className },
      section(
        { class: "result" },
        h1("Result"),

        div(
          { class: "score-container" },
          div({ class: "score" }, "76"),
          div({ class: "score-total" }, "of 100")
        ),
        h2("Great"),
        p(
          "You scored higher than 65% of the people who have taken these tests."
        )
      ),
      section(
        { class: "summary" },
        h1("Summary"),
        ul(
          data.map(({ category, score, icon }) =>
            li(
              div(
                { class: "category" },
                img({ src: icon }),
                span({ class: "category" }, category)
              ),
              div(
                span({ class: "score" }, score),
                span({ class: "score-total" }, "/100")
              )
            )
          )
        ),
        button("Continue")
      )
    );
  };
}
