import hero from "./Hero";
import features from "./Features";

export default function (context) {
  const { bau, css } = context;
  const { div, span, a } = bau.tags;
  const Hero = hero(context);
  const Features = features(context);

  const className = css`
    grid-area: main;
  `;

  const featuresContent = [
    {
      title: "SSG",
      Content: () =>
        "Static Site Generation: build a static website from markdown content.",
    },
    {
      title: "Flexible",
      Content: () =>
        "Customize everything: header, footer, navigation tree etc...",
    },
    {
      title: "Bau",
      Content: () =>
        span(
          "Built with ",
          a({ href: "https://github.com/grucloud/bau" }, "Bau"),
          ", a lean library to build web interface."
        ),
    },
  ];

  return function Main({}) {
    return div(
      {
        class: className,
      },
      Hero({
        name: "Bausaurus",
        text: "Static Site Generation",
        tagLine: "Build a static web site from your markdown documentation",
      }),
      Features({ featuresContent })
    );
  };
}
