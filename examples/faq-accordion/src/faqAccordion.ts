import { type Context } from "@grucloud/bau-ui/context";
import accordion from "./accordion";

export default function (context: Context) {
  const { bau, css } = context;
  const { h1, article, img } = bau.tags;

  const accordionDefs = [
    {
      question: "What is Frontend Mentor, and how will it help me?",
      answer:
        "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.",
    },
    {
      question: "Is Frontend Mentor free?",
      answer:
        "Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels.",
    },
    {
      question: "Can I use Frontend Mentor projects in my portfolio?",
      answer:
        "Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers!",
    },
  ];

  const Accordion = accordion(context);

  const className = css`
    background-color: white;
    min-width: 400px;
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    border-radius: 0.6rem;
    padding: 1rem;
    margin: 0.5rem;
    h1 {
      display: inline-flex;
      gap: 1rem;
    }
  `;

  return function faqAccordion() {
    return article(
      { class: className },
      h1(img({ src: "./assets/images/icon-star.svg", alt: "star" }), "FAQs"),
      Accordion({
        data: accordionDefs.map(({ question, answer }) => ({
          Header: () => question,
          Content: () => answer,
        })),
      })
    );
  };
}
