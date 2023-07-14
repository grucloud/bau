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
      title: "ABC",
      Content: () => "Awesome Project",
    },
    {
      title: "DEF",
      Content: () => "BlAzInG FaSt",
    },
  ];

  return function Main({}) {
    return div(
      {
        class: className,
      },
      Hero({
        name: "Super Duper Project",
        text: "Bla Bla Bla",
        tagLine: "The sharpest knife in the drawer",
      }),
      Features({ featuresContent })
    );
  };
}
