import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';
import { LoginFormComponent } from './components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private route = inject(ActivatedRoute);
  private routerService = inject(RouterService);

  ngOnInit() {
    this.getActualRoute();
  }

  getActualRoute() {
    this.route.url.subscribe(([url]) => {
      const { path } = url;
      this.routerService.setRoute(path);
    });
  }
}
