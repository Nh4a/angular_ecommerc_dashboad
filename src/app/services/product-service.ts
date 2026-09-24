import { Injectable, Injector, signal } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { ProductFormModel } from '../models/product-form-model';
import { Observable } from 'rxjs';
import { CategoryService } from './category-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiURL: string = 'http://localhost:3000/api/products';
  public isLoading = signal<boolean>(false);
  public error = signal<string>('');
  constructor(private http: HttpClient) {}
  private products = signal<ProductModel[]>([]);
  public isOpenForm = signal<boolean>(false);
  public productForm: ProductFormModel = {
    _id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    image: null,
    imagePath: '',
    variants: [
      {
        size: '',
        colorCode: '#000000',
        colorName: '',
        stock: 0,
      },
    ],
  };

  // form management
  public closeForm() {
    this.clearForm();

    this.isOpenForm.set(false);
  }
  public openForm(product: ProductModel | null) {
    if (!product) {
      this.isOpenForm.set(true);
      return;
    }
    this.productForm = {
      image: null,
      _id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category._id,
      imagePath: product.imagePath,
      variants: product.variants,
    };
    this.isOpenForm.set(true);
  }
  public deleteProduct(id: string ="") {
    if(confirm('Are you sure you want to delete this product?')) {
      this.http.delete<Response<ProductModel>>(`${this.apiURL}/${id}`, {}).subscribe({
        next: (res) => {
          if (res.success) {
            const removed = [...this.products()].filter((i) => i._id !== id);
            this.products.set(removed);
          }
        },
        error: (err) => {
          alert(err.error.message);
        },
        complete: () => {},
      });
    }

  }

  // api
  public fetchProduct() {
    this.isLoading.set(true);
    this.http.get<Response<ProductModel[]>>(this.apiURL).subscribe({
      next: (res) => {
        this.products.set(res.data);
        console.log(this.products());
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
  public getProduct(): ProductModel[] {
    return this.products();
  }
  public save(product: ProductFormModel) {
    const frmData = new FormData();
    frmData.append('title', product.title);
    frmData.append('description', product.description);
    frmData.append('category', product.category);
    frmData.append('price', product.price.toString());
    if (product.image) {
      frmData.append('image', product.image);
    }
    frmData.append('variants', JSON.stringify(product.variants));

    // if product _id is null it call create api
    if (!product._id) {
      console.log('product :', product);
      this.http.post<Response<ProductModel>>(this.apiURL, frmData).subscribe({
        next: (res) => {
          this.fetchProduct();
        },
        error: (res) => {
          alert(res.error.message);
          console.log(res.error);
          this.error.set(res.message);
        },
        complete: () => {},
      });
      return;
    }
    //   if product _id not null it runs update
    this.http.put<Response<ProductModel>>(this.apiURL + `/${product._id}`, frmData).subscribe({
      next: (res) => {
        if (res.success) {
          this.fetchProduct();
        }
      },
      error: (res) => {
        alert(res.error.message);
      },
      complete: () => {
        this.closeForm();
      },
    });
  }

  public clearForm(): void {
    this.productForm = {
      _id: null,
      title: '',
      image: null,
      description: '',
      price: 0,
      category: '',
      imagePath: '',
      variants: [
        {
          size: '',
          colorCode: '#000000',
          colorName: '',
          stock: 0,
        },
      ],
    };
  }
}
