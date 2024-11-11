import { type Context } from "@grucloud/bau-ui/context";
import skeleton from "@grucloud/bau-ui/skeleton";
import alert from "@grucloud/bau-ui/alert";
import { Country } from "./types";

export default function (context: Context, { store }: any) {
  const { bau, css, window } = context;
  const {
    h1,
    article,
    div,
    img,
    figure,
    figcaption,
    strong,
    p,
    section,
    a,
    span,
    ul,
    li,
  } = bau.tags;
  const { getByName, findBorder } = store;

  bau.derive(() => {
    const data = getByName.data.val[0];
    if (data?.borders) {
      findBorder.run(data.borders);
    }
  });

  const Skeleton = skeleton(context);

  const Alert = alert(context, {
    color: "danger",
    variant: "outline",
  });

  const AlertBorders = alert(context, {
    size: "sm",
    color: "danger",
    variant: "outline",
  });

  const className = css`
    margin-block: 2rem;
    > figure {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      > img {
        width: 100%;
        margin: auto;
      }
      > figcaption {
        padding: 1rem;
        .country-detail {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          font-size: smaller;
          line-height: 2rem;
        }
      }
    }
  `;

  const ValueSkeleton = () =>
    Skeleton({
      class: css`
        width: 80%;
        height: 1.5rem;
        margin-block: 0.6rem;
      `,
    });

  const CountrySkeleton = () =>
    article(
      {
        class: className,
      },
      figure(
        Skeleton({
          class: css`
            width: 100%;
            height: 15rem;
          `,
        }),
        figcaption(
          ValueSkeleton(),
          p(
            { class: "country-detail" },
            section(new Array(4).fill("").map(() => p(ValueSkeleton()))),
            section(new Array(3).fill("").map(() => p(ValueSkeleton())))
          )
        )
      )
    );

  const Borders = () =>
    div(
      {
        class: css`
          display: inline-flex;
          align-items: flex-start;
          gap: 1rem;
          > ul {
            list-style: none;
            display: inline-flex;
            flex-wrap: wrap;
            flex-direction: row;
            gap: 0.5rem;
            > li {
              padding-inline: 0.6rem;
              box-shadow: var(--shadow-s);
              a {
                text-decoration: none;
                font-size: 0.75rem;
                text-wrap: nowrap;
              }
            }
          }
        `,
      },
      strong("Borders:"),
      () =>
        findBorder.loading.val &&
        ul(
          new Array(3).fill("").map(() =>
            li(
              Skeleton({
                class: css`
                  width: 4rem;
                  height: 1.5rem;
                `,
              })
            )
          )
        ),
      () => findBorder.error.val && AlertBorders(findBorder.error.val),
      () =>
        ul(
          findBorder.data.val.map(({ name }: any) =>
            li(a({ href: name.common }, name.common))
          )
        )
    );

  const Content = ({
    name,
    flag,
    population,
    region,
    subregion,
    capital,
    currencies,
    languages,
    topLevelDomain,
  }: Country) =>
    article(
      { class: className },
      figure(
        img({
          class: "flag-picture",
          src: flag,
          alt: name,
        }),
        figcaption(
          h1(name),
          p(
            { class: "country-detail" },
            section(
              p(strong("Native Name: "), name),
              p(strong("Population: "), population),
              p(strong("Region: "), region),
              p(strong("Sub Region: "), subregion),
              p(strong("Capital: "), capital)
            ),
            section(
              p(strong("Top Level Domain: "), topLevelDomain.join(", ")),
              p(
                strong("Currencies: "),
                currencies.map(({ name }) => name).join(", ")
              ),
              p(
                strong("Languages: "),
                languages.map(({ name }) => name).join(", ")
              )
            )
          ),
          p(Borders())
        )
      )
    );

  const BackButton = () =>
    a(
      {
        class: css`
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          padding-inline: 1rem;
          border-radius: 0.5rem;
          gap: 0.5rem;
          box-shadow: var(--shadow-s);
          span {
            font-size: 1.7rem;
          }
        `,
        onclick: () => {
          window.history.back();
        },
      },
      span("←"),
      "BACK"
    );

  return ({}) => {
    return div(
      {
        class: css`
          padding: 2rem;
          > p {
            margin-bottom: 1rem;
          }
        `,
      },
      p(BackButton()),
      p(() => getByName.error.val && Alert(getByName.error.val)),
      () => getByName.loading.val && CountrySkeleton(),
      () => getByName.data.val[0] && Content(getByName.data.val[0])
    );
  };
}
