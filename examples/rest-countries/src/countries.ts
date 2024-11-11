import { type Context } from "@grucloud/bau-ui/context";
import skeleton from "@grucloud/bau-ui/skeleton";
import alert from "@grucloud/bau-ui/alert";

import { Country } from "./types";

export default function (context: Context, { store }: any) {
  const { bau, css } = context;
  const { a, ul, li, div, p, img, h1, figure, figcaption, strong } = bau.tags;
  const { getAll } = store;

  const Skeleton = skeleton(context);

  const Alert = alert(context, {
    color: "danger",
    variant: "outline",
  });

  const className = css`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    > li {
      box-shadow: var(--shadow-s);
      overflow: hidden;
      width: 13rem;
      min-height: 10rem;
      border-radius: 1rem 1rem 0 0;
      transition: transform 0.2s;
      &:hover {
        transform: translateY(4px);
      }
      &:has(> a:focus) {
        outline: 2px solid var(--color-primary);
      }
      > a {
        text-decoration: none;
        color: var(--color);
        outline: none;
      }
      figure {
        > figcaption {
          padding: 1rem;
          > h1 {
            font-size: 1rem;
          }
          > p {
            font-size: 0.7rem;
            line-height: 1.6rem;
          }
        }
        > img {
          height: 10rem;
          object-fit: cover;
          width: 100%;
        }
      }
    }
  `;

  const CountriesSkeleton = () =>
    ul(
      {
        class: className,
      },
      new Array(16).fill("").map(() =>
        li(
          Skeleton({
            class: css`
              width: 100%;
              height: 15rem;
            `,
          })
        )
      )
    );

  const CountryItem = ({ name, flag, population, region, capital }: Country) =>
    li(
      a(
        { href: name, tabindex: "0" },
        figure(
          img({
            class: "flag-picture",
            src: flag,
            alt: name,
          }),
          figcaption(
            h1(name),
            p(strong("Population: "), population),
            p(strong("Region: "), region),
            p(strong("Capital: "), capital)
          )
        )
      )
    );

  return ({ data }: { data: Country[] }) => {
    return div(
      () => getAll.loading.val && CountriesSkeleton(),
      () => getAll.error.val && Alert(getAll.error.val),
      ul(
        { class: className },
        data.map((country) => CountryItem(country))
      )
    );
  };
}
