export interface ProductFormModel {
  _id?: string | null;
  title: string;
  description: string;
  price: number;
  category: string;
  imagePath: string;
  image : File | null;
  variants: ProductVariant[];
}
export interface ProductVariant {
  size: string;
  colorCode: string;
  colorName: string;
  stock: number;
}
