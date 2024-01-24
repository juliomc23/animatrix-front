import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { RouterService } from './services/router.service';
import { LoginComponent } from './views/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, PrivateLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'animatrix-front';
  private routerService = inject(RouterService);

  actualRoute = this.routerService.getRoute();

  constructor() {
    effect(() => {
      this.actualRoute = this.routerService.getRoute();
    });
  }
}
