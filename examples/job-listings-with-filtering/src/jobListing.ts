import { type Context } from "@grucloud/bau-ui/context";

import data from "./data.json";

export default function (context: Context) {
  const { bau, css } = context;
  const { form, ul, li, img, strong, span, p, div, section, button } = bau.tags;

  const className = css`
    padding: 1rem;
    max-width: 1000px;
    margin: auto;

    > ul.job-list {
      list-style: none;
      padding: 0;
      margin: 0;

      > li {
        display: flex;
        box-shadow: var(--shadow);
        flex-direction: row;
        background-color: white;
        border-radius: 0.3rem;
        margin-block: 1rem;
        &.featured::before {
          content: "";
          width: 5px;
          background-color: var(--color-primary);
        }
        margin-block: 2.5rem;
        .container {
          flex-grow: 1;
          padding: 1rem;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          position: relative;

          @media (max-width: 600px) {
            padding-top: 2.5rem;
            img {
              top: -25px;
              position: absolute;
              width: 50px;
              height: 50px;
            }
          }

          .company {
            color: var(--color-primary);
          }
          .badge {
            display: inline-flex;
            align-items: center;
            font-weight: 700;
            border-radius: 0.8rem;
            color: var(--font-color-primary);
            padding-inline: 0.5rem;
            padding-block: 0.3rem 0.1rem;
            font-size: 0.7rem;
            text-transform: uppercase;
          }
          .badge-new {
            background-color: var(--color-primary);
          }
          .badge-featured {
            background-color: black;
          }
        }
      }
    }
    @media (max-width: 600px) {
    }
  `;

  const tagsState = bau.state<string[]>([]);
  const hasTagsState = bau.derive(() => tagsState.val.length > 0);

  const addTag = (tag: string) => () => {
    const idx = tagsState.val.findIndex((v) => v === tag);
    if (idx == -1) {
      tagsState.val.push(tag);
    }
  };
  const clearTags = () => (tagsState.val = []);
  const clearTag = (tag: string) => () => {
    const idx = tagsState.val.findIndex((v) => v === tag);
    if (idx >= 0) {
      tagsState.val.splice(idx, 1);
    }
  };

  const jobsState = bau.state(data);

  const jobsFilteredState = bau.derive(() =>
    tagsState.val.length > 0
      ? jobsState.val.filter((job) =>
          tagsState.val.every((tag) =>
            [...job.tools, ...job.languages].includes(tag)
          )
        )
      : jobsState.val
  );

  const ButtonClearAll = () =>
    button(
      {
        class: css`
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
          font-size: 0.9rem;
          &:hover {
            text-decoration: underline;
            font-weight: bold;
          }
        `,
        type: "button",
        onclick: clearTags,
      },
      "Clear"
    );

  const TagsFilter = () => () =>
    section(
      {
        style: () => `visibility:${hasTagsState.val ? "visible" : "hidden"}`,
        class: css`
          margin-top: -50px;
          min-height: 70px;
          background-color: white;
          padding: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: space-between;
          > ul {
            list-style: none;
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            > li {
              font-weight: bold;
              display: inline-flex;
              align-items: center;
              color: var(--color-primary);
              background-color: var(--background-color);
              border-radius: 0.4rem;
              overflow: hidden;
              & span {
                padding-inline: 0.7rem;
              }
              & button {
                padding-block: 0.6rem;
                background: none;
                border: none;
                background-color: var(--color-primary);
                transition: all 0.3s;
                & span {
                  filter: brightness(0) saturate(100%) invert(95%) sepia(0%)
                    saturate(18%) hue-rotate(328deg) brightness(104%)
                    contrast(107%);
                }
                cursor: pointer;
                &:hover {
                  background-color: black;
                }
              }
            }
          }
        `,
      },
      bau.loop(tagsState, ul(), (tag) =>
        li(
          span(tag),
          button({ type: "button", onclick: clearTag(tag) }, span("❌"))
        )
      ),
      ButtonClearAll()
    );

  const LanguagesSkills = (item: any) =>
    ul(
      {
        class: css`
          flex-grow: 1;
          list-style: none;
          display: inline-flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          @media (max-width: 600px) {
            justify-content: flex-start;
            border-top: 1px solid var(--color-emphasis-300);
            padding-top: 1rem;
          }
          align-items: center;
          gap: 1rem;
          > li {
            & button {
              border-radius: 0.5rem;
              padding-inline: 0.7rem;
              padding-block: 0.4rem;
              font-weight: bold;
              cursor: pointer;
              border: none;
              background-color: var(--background-color);
              color: var(--color-primary);
              transition: all 0.3s;
              &:hover {
                background-color: var(--color-primary);
                color: var(--font-color-primary);
              }
            }
          }
        `,
      },
      [...item.tools, ...item.languages].map((tag) =>
        li(button({ type: "button", onclick: addTag(tag) }, tag))
      )
    );

  const BadgeNew = (item: any) =>
    item.new
      ? span(
          {
            class: ["badge", "badge-new"],
          },
          "New!"
        )
      : "";

  const BadgeFeatured = (item: any) =>
    item.featured
      ? span(
          {
            class: ["badge", "badge-featured"],
          },
          "Featured"
        )
      : "";

  const JobItem = (item: any) =>
    li(
      { id: item.id, class: item.featured ? "featured" : "" },
      div(
        { class: "container" },
        img({ src: item.logo, alt: "", width: 88, height: 88 }),
        div(
          {
            class: css`
              display: grid;
              gap: 0.7rem;
            `,
          },
          div(
            {
              class: css`
                display: inline-flex;
                gap: 0.7rem;
                align-items: center;
              `,
            },
            span({ class: "company" }, item.company),
            BadgeNew(item),
            BadgeFeatured(item)
          ),
          p(strong(item.position)),
          p(
            {
              class: css`
                color: var(--font-color-secondary);
              `,
            },
            [item.postedAt, item.contract, item.location].join(" • ")
          )
        ),
        LanguagesSkills(item)
      )
    );

  return () => {
    return form(
      { class: className },
      TagsFilter(),
      bau.loop(jobsFilteredState, ul({ class: "job-list" }), JobItem)
    );
  };
}
