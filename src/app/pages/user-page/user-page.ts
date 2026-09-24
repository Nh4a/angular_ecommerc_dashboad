import { Component, OnInit, signal } from '@angular/core';
import { CategoryForm } from '../../components/forms/category-form/category-form';
import { DatFormatPipe } from '../../pipes/dat-format-pipe';
import { UserService } from '../../services/user-service';
import { PaddTxtPipe } from '../../pipes/padd-txt-pipe';
import { UserFormModel } from '../../models/user-form-model';
import { UserForm } from '../../components/forms/user-form/user-form';
import { CategoryFormModel } from '../../models/category-model';
import { UserModel } from '../../models/user-model';
import { FormBuilder, FormsModule } from '@angular/forms';
import { UtileService } from '../../services/utile-service';
import { checkCleanGit } from '@angular/cli/src/commands/update/utilities/git';

@Component({
  selector: 'app-user-page',
  imports: [CategoryForm, DatFormatPipe, PaddTxtPipe, UserForm, FormsModule],
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage implements OnInit {
  protected isOpenForm = signal<boolean>(false);
  protected errorMessage = signal<string>('');
  protected resetPwErr = signal<string>('');
  protected openResetPW = signal<boolean>(false);
  protected updatePW: string = '';
  idToUpdatePw: string = '';

  protected formUser: UserFormModel = {
    _id: undefined,
    name: '',
    email: '',
    password: '',
    isActive: true,
    role: 'user',
  };

  constructor(
    protected userService: UserService,
    protected ut: UtileService,
  ) {}

  protected openResetPasswordForm(id:string) {
    this.openResetPW.set(true);
    this.idToUpdatePw = id;
  }
  protected closeResetPasswordForm() {
    this.idToUpdatePw = '';
    this.openResetPW.set(false);
  }

  openUpdateForm(item: UserFormModel) {
    this.formUser = { ...item };
    this.isOpenForm.set(true);
  }

  onResetPw() {
    this.userService.resetPassword(this.idToUpdatePw, this.updatePW).subscribe({
      next: (res) => {
        if (res.success) {
          this.closeResetPasswordForm();
        }
      },
      error: (err) => {
        this.resetPwErr.set(err.error.message);
        setTimeout(() => {
          this.resetPwErr.set('');
        }, 5000);
      },
    });
  }

  onDelete(id:string) {
    this.userService.deleteOne(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.userService.fetchUser()
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  save() {
    this.userService.isModifying.set(true);
    if (this.formUser._id) {
      this.userService.updateUser(this.formUser._id, this.formUser).subscribe({
        next: (res) => {
          if (res.success) {
            this.userService.isModifying.set(false);
            this.closeForm();
          }
        },
        error: (res) => {
          this.userService.isModifying.set(false);
          this.errorMessage.set(res.error.message);
          setTimeout(() => {
            this.errorMessage.set('');
          }, 5000);
        },
        complete: () => {},
      });
      //   update
      return;
    }

    this.userService.createUser(this.formUser).subscribe({
      next: (response) => {
        if (response.success) {
          this.userService.fetchUser();
          this.closeForm();
        }
      },
      error: (error) => {
        this.errorMessage.set(error.error.message);
        setTimeout(() => {
          this.errorMessage.set('');
        }, 5000);
      },
      complete: () => {
        this.userService.isModifying.set(false);
      },
    });
  }

  protected closeForm() {
    this.formUser = {
      _id: undefined,
      name: '',
      email: '',
      password: '',
      isActive: true,
      role: 'user',
    };
    this.isOpenForm.set(false);
  }

  protected openForm() {
    this.isOpenForm.set(true);
  }

  ngOnInit() {
    this.userService.fetchUser();
  }
}
