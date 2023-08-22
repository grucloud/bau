import carousel, { type Slide } from "@grucloud/bau-ui/carousel";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div } = bau.tags;
  const Carousel = carousel(context);

  const slides: Slide[] = [{ src: "https://source.unsplash.com/random" }];

  const Previous = () => div("Previous");
  const Next = () => div("Next");

  return (props: any) => Carousel({ ...props, slides, Next, Previous });
};
