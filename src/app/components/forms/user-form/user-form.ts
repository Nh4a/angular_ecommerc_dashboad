import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtileService } from '../../../services/utile-service';
import { UserService } from '../../../services/user-service';
import { UserFormModel } from '../../../models/user-form-model';
import { FormsModule } from '@angular/forms';
import { Message } from 'postcss';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  @Input() public User: UserFormModel = {
    name: '',
    email: '',
    password: '',
    isActive: true,
    role: 'user',
  };
  @Input() public message: string = '';
  @Output() public onSave = new EventEmitter();
  @Output() public onCancel = new EventEmitter();

  constructor(
    protected ut: UtileService,
    protected userService: UserService,
  ) {}
}
