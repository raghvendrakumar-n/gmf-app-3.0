import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, OAuthProvider } from '../models/user.model';

const STORAGE_KEY = 'gmf_auth_user';

const OAUTH_MOCK_USERS: Record<OAuthProvider, User> = {
  apple: { name: 'John Doe', initials: 'JD', plan: 'Pro', provider: 'apple' },
  google: { name: 'John Doe', initials: 'JD', plan: 'Pro', provider: 'google' },
  linkedin: { name: 'John Doe', initials: 'JD', plan: 'Pro', provider: 'linkedin' },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  currentUser$;

  constructor() {
    const stored = this.loadFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(stored);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  doOAuthLogin(provider: OAuthProvider): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { ...OAUTH_MOCK_USERS[provider] };
        this.currentUserSubject.next(user);
        this.saveToStorage(user);
        resolve(user);
      }, 1200);
    });
  }

  doGuestLogin(): void {
    const guest: User = { name: 'Guest', initials: 'G', plan: 'Free', guest: true, provider: null };
    this.currentUserSubject.next(guest);
    this.saveToStorage(guest);
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private saveToStorage(user: User): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {}
  }

  private loadFromStorage(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
