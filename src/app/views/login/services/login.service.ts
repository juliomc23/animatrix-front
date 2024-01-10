import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';

interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>('http://localhost:3000/auth/login', {
        email,
        password,
      })
      .subscribe({
        next: (res) => {
          this.tokenService.setAccessToken(res.accessToken);
          if (this.tokenService.getAccessToken())
            this.router.navigate(['home']);
        },

        error: (err) => console.log(err.error.message),
      });
  }
}
