import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private $accessToken: WritableSignal<string> = signal(
    localStorage.getItem('accessToken')
      ? JSON.stringify(localStorage.getItem('accessToken'))
      : ''
  );

  setAccessToken(token: string) {
    this.$accessToken.set(token);
    localStorage.setItem('accessToken', token);
  }

  getAccessToken() {
    return this.$accessToken();
  }
}
