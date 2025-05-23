export type CafeDish = {
  title: string;
  price: number;
  description: string;
  imageUrl: string | null;
  size: string | null;
  subcategory: string;
  addons?: { title: string; price: number }[];
};

export type CafeCategory = {
  name: string;
  dishes: CafeDish[];
};
