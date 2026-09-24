import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { UtileService } from '../../../services/utile-service';
import { ProductService } from '../../../services/product-service';
import { FormGroup, FormsModule } from '@angular/forms';
import { ProductFormModel } from '../../../models/product-form-model';
import { CategoryService } from '../../../services/category-service';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnDestroy, OnInit {
  //declare attribute of components
  protected imageFile: File | null = null;
  protected imagePreview = signal<string | null>(null);
  @Input() product: ProductFormModel = {
    _id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    imagePath: '',
    image: null,
    variants: [
      {
        size: '',
        colorCode: '#000000',
        colorName: '',
        stock: 0,
      },
    ],
  };
  @Output() onCancel = new EventEmitter();
  // @Output() onSave = new EventEmitter();

  constructor(
    public ut: UtileService,
    protected cService: CategoryService,
    protected productService: ProductService,
  ) {}

  addVariant() {
    this.product.variants = [
      ...this.product.variants,
      {
        size: '',
        colorCode: '#000000',
        colorName: '',
        stock: 0,
      },
    ];
  }

  onImageSelected(event: Event): any {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files?.length === 0) {
      return;
    }

    const file: File = input.files[0];

    if (!file.type.startsWith('image/')) {
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    this.imageFile = file;

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const fr = fileReader.result as string;
      this.imagePreview.set(fr);
    };

    fileReader.readAsDataURL(file);
  }

  removeVariant(index: number) {
    this.product.variants.splice(index, 1);
  }

  emitCancel() {
    this.onCancel.emit();
  }

  emitSave() {
    this.product.image = this.imageFile;
    console.log('product in form', this.product);
    this.productService.save(this.product);
  }
  ngOnInit() {
    console.log('ngOnInit' , this.product);
  }
  ngOnDestroy() {
    this.product = {
      _id: '',
      title: '',
      description: '',
      price: 0,
      category: '',
      imagePath: '',
      image: null,
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
