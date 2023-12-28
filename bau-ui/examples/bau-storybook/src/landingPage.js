import button from "@grucloud/bau-ui/button/button";
import chip from "@grucloud/bau-ui/chip";

import hero from "./components/Hero";
import features from "./components/features";
import chart from "./components/chartBundleSize";

export default function (context) {
  const { bau, css, config } = context;
  const { div, p, a, section } = bau.tags;
  const Hero = hero(context);
  const Features = features(context);
  const Button = button(context);
  const Chip = chip(context);

  const ChartBundleSize = chart(context);

  const ChipStack = (...children) =>
    div(
      {
        class: css`
          background-color: var(--color-emphasis-100);
          border-radius: var(--global-radius);
          padding: 0.5rem 0.5rem;
          margin: 0.5rem 0;
        `,
      },
      div(
        {
          class: css`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: center;

            gap: 1rem;
          `,
        },
        ...children
      )
    );

  const className = css``;

  const bundleSizes = [
    { libName: "Bau UI ", size: 11 },
    { libName: "Shadcn/React", size: 88 },
    { libName: "Svelte UI", size: 105 },
    { libName: "Quasar/Vue ", size: 124 },
    {
      libName: "Material UI React",
      size: 133,
    },

    { libName: "Material UI Angular", size: 151 },
  ];

  const featuresContent = [
    {
      title: "UI components for the web",
      Content: () => [
        p(
          "Over 50 components such as button, input, tabs, autocomplete etc ..."
        ),
        Button(
          {
            href: `${config.base}/components`,
            color: "primary",
            variant: "solid",
            size: "lg",
          },
          "Visit Gallery"
        ),
      ],
    },
    {
      title: "Component style",
      Content: () => [
        p("Each component has a combination of variant, color and size:"),
        ChipStack(
          Button({ variant: "solid", color: "primary" }, "solid"),
          Button({ variant: "outline", color: "primary" }, "outline"),
          Button({ variant: "plain", color: "primary" }, "plain")
        ),
        ChipStack(
          Button({ variant: "solid", color: "neutral", size: "sm" }, "neutral"),
          Button({ variant: "solid", color: "primary", size: "sm" }, "primary"),
          Button({ variant: "solid", color: "danger", size: "sm" }, "danger"),
          Button({ variant: "solid", color: "warning", size: "sm" }, "warning")
        ),
        ChipStack(
          Button({ variant: "outline", color: "primary", size: "sm" }, "small"),
          Button(
            { variant: "outline", color: "primary", size: "md" },
            "medium"
          ),
          Button({ variant: "outline", color: "primary", size: "lg" }, "large")
        ),
      ],
    },
    {
      title: "Tech",
      Content: () => [
        p(
          "Built with ",
          a({ href: "https://github.com/grucloud/bau" }, "Bau"),
          ", a 2kB alternative to React, Vue, Angular, and Svelte."
        ),
        p("Typescript support for a better developer experience."),
      ],
    },
    // {
    //   title: "Bundle Size",
    //   Content: () => [
    //     p(
    //       "The component bundle size is about 8x smaller compared to popular React UI component library."
    //     ),
    //     p("Faster download time for users."),
    //     p("Save in bandwith fees for the operator."),
    //     p("Suitable for low bandwith network and low cost device."),
    //   ],
    // },
  ];

  const CallToAction = () =>
    section(
      {
        class: css`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `,
      },
      Button(
        {
          color: "primary",
          variant: "solid",
          href: "GettingStarted",
          size: "lg",
        },
        "Getting Started"
      ),
      Button(
        {
          color: "primary",
          variant: "outline",
          href: "components",
          size: "lg",
        },
        "Component Gallery"
      ),
      Button(
        {
          color: "neutral",
          variant: "outline",
          href: "https://github.com/grucloud/bau/tree/main/bau-ui",
          target: "_blank",
          size: "lg",
        },
        "Source Code"
      )
    );
  return function Main({}) {
    return div(
      {
        class: className,
      },
      Hero({
        name: "Bau UI",
        text: "Stylable UI Components",
        tagLine: "Web UI components, easy to use, stylable, lightweight.",
      }),
      Features({ featuresContent }),
      ChartBundleSize({ data: bundleSizes }),
      CallToAction()
    );
  };
}
