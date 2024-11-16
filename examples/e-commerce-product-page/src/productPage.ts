import { type Context } from "@grucloud/bau-ui/context";
import { type State } from "@grucloud/bau";

import carousel from "./carousel";
import productCard from "./productCard";

const IMAGES: ImageInfo[] = new Array(4).fill("").map((_, i) => ({
  thumbnail: `./assets/images/image-product-${i + 1}-thumbnail.jpg`,
  desktop: `./assets/images/image-product-${i + 1}.jpg`,
  alt: `images-${i}`,
}));

const productInfo: ProductInfo = {
  brand: "Sneaker Company",
  name: "Fall Limited Edition Sneakers",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  imageInfo: IMAGES,
  price: 125,
  priceOld: 250,
  discount: 50,
};

export default function (
  context: Context,
  { cartState }: { cartState: State<CartItem[]> }
) {
  const { bau, css } = context;
  const { article } = bau.tags;
  const Carousel = carousel(context, {});
  const ProductCard = productCard(context, { cartState });

  const className = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;

  return () => {
    return article(
      { class: className },
      Carousel({ images: IMAGES }),
      ProductCard(productInfo)
    );
  };
}
