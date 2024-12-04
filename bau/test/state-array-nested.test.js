import { describe, vi, it, assert, expect } from "vitest";

const sleep = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

import Bau from "../bau";
const comments = [
  { id: 1, replies: [] },
  { id: 2, replies: [] },
];
describe("nested array", async () => {
  const bau = Bau();
  const { h1, div, button, ul, li } = bau.tags;

  const commentsState = bau.state(comments);

  const Comment = (comment) => {
    const repliesState = bau.state(comment.replies);
    return li(
      h1(comment.id),
      button(
        {
          id: `button-${comment.id}`,
          onclick: () => {
            repliesState.val.push({ id: 3, comment: "hi" });
          },
        },
        "Add reply"
      ),
      bau.loop(repliesState, ul(), (r) => li(r.comment))
    );
  };

  const TestComponent = () => div(bau.loop(commentsState, ul(), Comment));

  it("click", async () => {
    const el = TestComponent();
    document.body.appendChild(el);

    document.getElementById("button-1").click();
    await sleep();
    const ulEl = el.querySelector("ul");

    assert.equal(ulEl.childNodes.length, 2);
    document.body.removeChild(el);
  });
});
