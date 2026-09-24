import { Component, OnInit, signal } from '@angular/core';
import { DatFormatPipe } from '../../pipes/dat-format-pipe';
@Component({
  selector: 'app-category-page',
  imports: [CategoryForm, DatFormatPipe],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})
export class CategoryPage implements OnInit {
  protected isOpenForm = signal<boolean>(false);
  formCategories: CategoryFormModel = {
    _id: '',
    name: '',
    description: '',
    status: true,
  };

  constructor(
    protected categoryService: CategoryService,
    public gs: UtileService,
  ) {}

  onSave(): void {
    this.categoryService.isModifying.set(true);
    if(this.formCategories._id){
      this.updateOne();
      return
    }
    this.addOne();
  }

  updateOne(): void {
    this.categoryService.isModifying.set(true);
    this.categoryService.update(this.formCategories._id || " ", this.formCategories).subscribe({
      error:(res)=>{
        alert(res.error.message);
      },
      complete:()=>{
        this.categoryService.fetchCategories();
        this.categoryService.isModifying.set(false);
        this.closeForm();
      }
    });
  }

  private addOne(){
    this.categoryService.create(this.formCategories).subscribe({
      next: (res) => {},
      complete: () => {
        this.categoryService.fetchCategories();
        this.categoryService.isModifying.set(false);
        this.closeForm();
      },
    });
  }



  openForm(item: CategoryFormModel) {
    this.formCategories = { ...item };
    this.isOpenForm.set(true);
  }

  closeForm() {
    this.isOpenForm.set(false);
    this.formCategories = {
      _id: '',
      name: '',
      description: '',
      status: true,
    };
  }

  delete(id: string = "") {
    this.categoryService._delete(id)
  }

  ngOnInit() {
    console.log('load category page');
    this.categoryService.fetchCategories();
  }

  protected readonly console = console;
}
import { CategoryService } from '../../services/category-service';
import { UtileService } from '../../services/utile-service';
import { CategoryForm } from '../../components/forms/category-form/category-form';

import { CategoryFormModel, CategoryModel } from '../../models/category-model';
import { checkCleanGit } from '@angular/cli/src/commands/update/utilities/git';
