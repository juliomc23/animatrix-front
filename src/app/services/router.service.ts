import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private $actualRoute = signal<string>('');

  setRoute(route: string) {
    this.$actualRoute.set(route);
  }

  getRoute() {
    return this.$actualRoute();
  }
}
