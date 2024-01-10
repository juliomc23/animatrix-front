import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private loginService: LoginService = inject(LoginService);
  watchPassword = false;
  loginFormControl = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    const { email, password } = this.loginFormControl.value;

    if (email && password) this.loginService.login(email, password);
  }

  toggleWatchPassword() {
    this.watchPassword = !this.watchPassword;
  }
}
