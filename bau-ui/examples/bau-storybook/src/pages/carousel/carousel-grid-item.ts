import carousel from "@grucloud/bau-ui/carousel";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const Carousel = carousel(context);

  return (props: any) => Carousel({ ...props }, "");
};
