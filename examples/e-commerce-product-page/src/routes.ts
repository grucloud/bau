import { type Context } from "@grucloud/bau-ui/context";
import productPage from "./productPage";
import { type State } from "@grucloud/bau";

export const createRoutes = (
  context: Context,
  { cartState }: { cartState: State<CartItem[]> }
) => {
  const ProductPage = productPage(context, { cartState });

  return [
    {
      path: "",
      action: (routerContext: any) => {
        return {
          routerContext,
          title: "Product",
          component: () => ProductPage(),
        };
      },
    },
  ];
};
