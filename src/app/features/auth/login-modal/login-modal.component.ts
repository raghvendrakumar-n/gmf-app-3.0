import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { OAuthProvider } from '../../../core/models/user.model';

@Component({
  selector: 'app-login-modal',
  standalone: false,
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();
  loadingProvider: string | null = null;

  constructor(private authService: AuthService) {}

  async doOAuthLogin(provider: OAuthProvider): Promise<void> {
    this.loadingProvider = provider;
    await this.authService.doOAuthLogin(provider);
    this.loadingProvider = null;
    this.loginSuccess.emit();
    this.closed.emit();
  }

  doGuestLogin(): void {
    this.authService.doGuestLogin();
    this.loginSuccess.emit();
    this.closed.emit();
  }
}
