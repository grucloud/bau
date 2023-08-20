import breadcrumbs from "@grucloud/bau-ui/breadcrumbs/breadcrumbs.js";

export default function (context) {
  const { bau, css } = context;

  const Breadcrumbs = breadcrumbs(context);

  return function BreadcrumbsDoc({ breadcrumbs }) {
    const breadcrumbsProps = {
      "data-breadcrumbs": JSON.stringify(breadcrumbs),
      class: css`
        grid-area: breadcrumbs;
      `,
      items: [
        {
          href: "/",
          name: "\u2302",
        },
        ...breadcrumbs,
      ],
    };

    return Breadcrumbs(breadcrumbsProps);
  };
}
