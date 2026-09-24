import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CategoryForm } from '../../components/forms/category-form/category-form';
import { ProductForm } from '../../components/forms/product-form/product-form';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-product-page',
  imports: [ProductForm],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit {
  constructor(
    protected productService: ProductService,
    protected categoryService: CategoryService,
  ) {}
  ngOnInit() {
    if (this.categoryService.getCategories().length === 0) {
      this.categoryService.fetchCategories();
    }
    this.productService.fetchProduct();
  }
}
