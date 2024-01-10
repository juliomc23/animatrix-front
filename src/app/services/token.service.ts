import { Injectable, WritableSignal, signal } from '@angular/core';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private $tokens: WritableSignal<Tokens> = signal({
    accessToken: '',
    refreshToken: '',
  });

  setTokens(tokens: Tokens) {
    this.$tokens.set(tokens);
  }

  getTokens() {
    return this.$tokens();
  }
}
