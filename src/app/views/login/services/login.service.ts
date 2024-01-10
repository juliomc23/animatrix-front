import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService, Tokens } from '../../../services/token.service';
import { Router } from '@angular/router';

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
      .post<Tokens>('http://localhost:3000/auth/login', {
        email,
        password,
      })
      .subscribe({
        next: (res) => {
          this.tokenService.setTokens(res);
          if (this.tokenService.getTokens().accessToken)
            this.router.navigate(['home']);
        },

        error: (err) => console.log(err.error.message),
      });
  }
}
