import carousel from "@grucloud/bau-ui/carousel";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Carousel = carousel(context);

  return () => section(Carousel({ content: "10" }, "Carousel"));
};
