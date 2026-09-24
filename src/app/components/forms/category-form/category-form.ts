import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UtileService } from '../../../services/utile-service';
import { CategoryService } from '../../../services/category-service';
import { FormsModule } from '@angular/forms';
import { CategoryFormModel } from '../../../models/category-model';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm {
  @Input() category: CategoryFormModel = {
    _id: '',
    name: '',
    description: '',
    status: true,
  };
  @Output() onCancel = new EventEmitter();
  @Output() onSave = new EventEmitter();

  emitCancel(){
    this.onCancel.emit();
  }

  emitSave(){
    this.onSave.emit();
  }

  constructor(
    public ut: UtileService,
    public categoryService: CategoryService,
  ) {}

}
