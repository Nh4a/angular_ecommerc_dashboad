import { Component } from '@angular/core';
import { UtileService } from '../../../services/utile-service';
import { Auth } from '../../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  protected email: string = '';
  protected password: string = '';

  constructor(
    protected ut: UtileService,
    protected authService: Auth,
  ) {}

  protected submit() {
    // alert(this.email + this.password);
    this.authService.login(this.email, this.password);
  }
}
