import button from "@grucloud/bau-ui/button/button";
import hero from "./components/Hero";
import features from "./components/features";
import chart from "./components/chartBundleSize";

export default function (context) {
  const { bau, css, config } = context;
  const { div, p, a } = bau.tags;
  const Hero = hero(context);
  const Features = features(context);
  const Button = button(context);
  const ChartBundleSize = chart(context);

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
          "Over 25 components such as button, input, tabs, autocomplete etc ..."
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
        p("3 variant: plain, outline and primary"),
        p("colors: neutral, primary, danger, warning"),
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
      ChartBundleSize({ data: bundleSizes })
    );
  };
}
