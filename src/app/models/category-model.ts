export interface CategoryModel {
  _id?: string;
  name: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id?: string;
    name: string;
  };
}

export interface CategoryFormModel {
  _id?: string;
  name: string;
  description: string;
  status: boolean;
}
