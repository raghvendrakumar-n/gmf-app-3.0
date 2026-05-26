export type OAuthProvider = 'apple' | 'google' | 'linkedin';

export interface User {
  name: string;
  initials: string;
  plan: 'Free' | 'Pro' | 'Pro+';
  provider: OAuthProvider | null;
  guest?: boolean;
}
