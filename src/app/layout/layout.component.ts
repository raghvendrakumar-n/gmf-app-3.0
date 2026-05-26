import { Component, inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { LoginModalService } from '../core/services/login-modal.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  private authService = inject(AuthService);
  loginModalService = inject(LoginModalService);
  showLogin = !this.authService.isAuthenticated;

  openLogin(): void {
    this.showLogin = true;
  }

  closeLogin(): void {
    this.showLogin = false;
  }
}
