export interface ProductModel {
  _id?: string;
  title: string;
  description: string;
  price: number;
  imagePath: string;
  category: {
    name: string;
    _id: string;
  };
  createdBy: {
    name: string;
    id: string;
  };
  rating: {
    rate: number;
    count: number;
  };
  variants: Variant[];
  totalStock: number;
  createdAt: Date;
}

interface Variant {
  size: string;
  colorCode: string;
  colorName: string;
  stock:number;
}
