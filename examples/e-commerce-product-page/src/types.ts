type ImageInfo = { alt: string; thumbnail: string; desktop: string };
type CartItem = {
  name: string;
  price: number;
  quantity: number;
  thumbnail?: string;
};

type ProductInfo = {
  name: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  priceOld: number;
  imageInfo: ImageInfo[];
};
