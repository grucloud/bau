import { type Context } from "@grucloud/bau-ui/context";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import data from "./data.json";

dayjs.extend(relativeTime);

export default function (context: Context) {
  const { bau, css } = context;
  const {
    form,
    ul,
    li,
    header,
    footer,
    img,
    figure,
    figcaption,
    span,
    p,
    div,
    button,
    time,
    textarea,
    dialog,
    a,
    h1,
  } = bau.tags;

  const className = css`
    padding: 1rem;
    max-width: 750px;
    margin: auto;

    > ul.comments {
      margin: 0;
      > li {
        .comment {
          background-color: var(--White);
          border-radius: 0.5rem;
          margin-block: 1rem;
          padding: 1rem;
          display: grid;
          grid-template-areas: "likes header reply" "likes content content";
          grid-template-columns: min-content auto;
          @media (max-width: 600px) {
            grid-template-areas: "header header" "content content" "likes reply";
          }

          gap: 1rem;

          > header {
            grid-area: header;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 1.2rem;
            & figure {
              display: inline-flex;
              align-items: center;
              gap: 1rem;
              & figcaption {
                font-weight: bold;
              }
            }
            .you-badge {
              background-color: var(--color-primary);
              color: var(--font-color-primary);
              padding-inline: 0.5rem;
              font-size: 0.85rem;
            }
            & time {
              color: var(--font-color-secondary);
            }
          }
          .content {
            grid-area: content;
          }
          .controls-button {
            grid-area: reply;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            > button {
              padding-inline: 0.5rem;
            }
          }
          > footer {
            display: flex;
            justify-content: space-between;
          }
        }
        .replies {
          border-left: 2px solid var(--Light-grayish-blue);
          padding-left: 2rem;
        }
        .reply {
          display: grid;
          gap: 1rem;
          background-color: var(--White);
          border-radius: 0.5rem;
          padding: 1rem;
          grid-template-areas: "avatar text send-button" ". text .";
          grid-template-columns: min-content auto min-content;
          @media (max-width: 600px) {
            grid-template-areas: "text text text" "avatar ... send-button";
            grid-template-rows: auto min-content;
          }

          & figure {
            grid-area: avatar;
          }
          .send-button-container {
            grid-area: send-button;
          }
          & footer {
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  `;

  const LikesButtons =
    ({ doVote }: any) =>
    ({ score, vote }: any) =>
      div(
        {
          class: css`
            grid-area: likes;
          `,
        },
        div(
          {
            class: css`
              display: inline-flex;
              align-items: center;
              flex-direction: column;
              @media (max-width: 600px) {
                flex-direction: row;
                justify-content: flex-start;
              }
              border-radius: 0.5rem;
              gap: 0.5rem;
              background-color: var(--Very-light-gray);
              & button {
                background: transparent;
                color: var(--color-primary-lightest);
                font-size: 1.3rem;
                transition: all 0.3s;
                &:disabled {
                  cursor: not-allowed;
                }
                &:hover,
                &:disabled {
                  color: var(--Moderate-blue);
                }
              }
              & span {
                font-weight: 500;
                font-size: 1.2rem;
                color: var(--Moderate-blue);
              }
            `,
          },
          button(
            { type: "button", onclick: doVote("up"), disabled: vote == "up" },
            "+"
          ),
          span(score),
          button(
            {
              type: "button",
              onclick: doVote("down"),
              disabled: vote == "down",
            },
            "−"
          )
        )
      );

  const ReplyButton = ({ onclick }: any) =>
    div(
      {
        class: "reply-button",
      },
      button(
        {
          type: "button",
          onclick,
        },
        img({ src: "./assets/images/icon-reply.svg", alt: "" }),
        "Reply"
      )
    );

  const EditButton = ({ onclick }: any) =>
    button(
      {
        type: "button",
        onclick,
      },
      img({ src: "./assets/images/icon-edit.svg", alt: "" }),
      "Edit"
    );

  const DeleteButton = ({ onclick }: any) =>
    button(
      {
        class: "danger",
        type: "button",
        onclick,
      },
      img({ src: "./assets/images/icon-delete.svg", alt: "" }),
      "Delete"
    );

  const Comment =
    ({
      updateComment = () => {},
      deleteComment = () => {},
      depth = 0,
    }: any = {}) =>
    (comment: any) => {
      const showWrite = bau.state(false);
      const showEdit = bau.state(false);
      const repliesState = bau.state(comment.replies ?? []);

      const commentState = bau.state(comment);
      const saveNewComment =
        ({}: any) =>
        (event: any) => {
          event.preventDefault();
          const { content } = Object.fromEntries(new FormData(event.target));
          const reply = {
            id: `${new Date().getTime()}`,
            createdAt: new Date(),
            score: 0,
            user: data.currentUser,
            content,
          };
          repliesState.val.push(reply);
          showWrite.val = false;
        };

      const WriteComment = (comment: any) =>
        form(
          { class: "reply", onsubmit: saveNewComment(comment) },
          textarea({
            autofocus: true,
            required: true,
            name: "content",
            rows: 5,
            placeholder: "Insert a comment",
          }),
          figure(
            img({
              src: data.currentUser.image.webp,
              alt: data.currentUser.username,
              width: 36,
              height: 36,
            })
          ),
          div(
            { class: "send-button-container" },
            button({ type: "submit", class: "primary" }, "SEND")
          )
        );

      const doDeleteComment =
        ({ id }: any) =>
        () => {
          const index = repliesState.val.findIndex((r: any) => r.id == id);
          if (index >= 0) {
            repliesState.val.splice(index, 1);
          }
          deleteDialog.close();
        };

      const DeleteDialog = () =>
        dialog(
          form(
            header(h1("Delete comment")),
            p(
              "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
            ),
            footer(
              button(
                {
                  type: "button",
                  class: ["neutral", "solid"],
                  onclick: () => deleteDialog.close(),
                },
                "NO, CANCEL"
              ),
              button(
                {
                  type: "button",
                  class: ["danger", "solid"],
                  onclick: deleteComment(comment),
                },
                "YES, DELETE"
              )
            )
          )
        );

      const deleteDialog = DeleteDialog();

      const showDeleteDialog =
        ({}: any) =>
        () => {
          deleteDialog.showModal();
        };

      const showCommentEdit =
        ({}: any) =>
        () => {
          showEdit.val = true;
        };

      const doUpdateComment =
        ({ id }: any) =>
        (event: any) => {
          event.preventDefault();
          const { content } = Object.fromEntries(new FormData(event.target));
          const index = repliesState.val.findIndex((r: any) => r.id == id);
          if (index >= 0) {
            repliesState.val[index].content = content;
          }
        };

      const ContentView = (comment: any) => [
        comment.replyingTo &&
          a({ href: `/users/${comment.replyingTo}` }, `@${comment.replyingTo}`),
        " ",
        comment.content,
      ];

      const ContentEdit = (comment: any) =>
        form(
          {
            onsubmit: (event: any) => {
              updateComment(comment)(event);
              showEdit.val = false;
            },
          },
          textarea({
            name: "content",
            rows: 8,
            value: comment.content,
            required: true,
            autofocus: true,
          }),
          footer(
            button({ type: "submit", class: ["solid", "primary"] }, "UPDATE")
          )
        );

      return li(
        div(
          { class: "comment" },
          header(
            figure(
              img({
                src: comment.user.image.webp,
                height: 36,
                width: 36,
                alt: "",
              }),
              figcaption(comment.user.username)
            ),
            isOwnComent(comment) && span({ class: "you-badge" }, "you"),
            time(dayjs(comment.createdAt).fromNow())
          ),
          p({ class: "content" }, () =>
            showEdit.val ? ContentEdit(comment) : ContentView(comment)
          ),
          () =>
            LikesButtons({
              doVote: (type: string) => () => {
                commentState.val.vote = type;
                if (type == "up") {
                  commentState.val.score++;
                } else {
                  commentState.val.score--;
                }
              },
            })(commentState.val),
          div(
            { class: "controls-button" },
            isOwnComent(comment)
              ? [
                  DeleteButton({ onclick: showDeleteDialog(comment) }),
                  () =>
                    showEdit.val
                      ? ""
                      : EditButton({
                          onclick: showCommentEdit(comment),
                        }),
                ]
              : ReplyButton({ onclick: () => (showWrite.val = !showWrite.val) })
          ),
          deleteDialog
        ),
        bau.loop(
          repliesState,
          ul({ class: "replies" }),
          Comment({
            updateComment: doUpdateComment,
            deleteComment: doDeleteComment,
            depth: depth + 1,
          })
        ),
        () => showWrite.val && WriteComment(comment)
      );
    };

  const sortComment = (comments: any) =>
    comments.sort((a: any, b: any) => (b.score > a.score ? 1 : -1));

  const isOwnComent = (comment: any) =>
    comment.user.username == data.currentUser.username;

  const commentsState = bau.state(sortComment(data.comments));

  return () => {
    return form(
      { class: className },
      bau.loop(commentsState, ul({ class: "comments" }), Comment())
    );
  };
}
