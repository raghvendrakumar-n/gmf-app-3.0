import { Component, Input } from '@angular/core';

interface ThemeItem {
  name: string;
  count: number;
  following: boolean;
}

const THEMES_DATA: ThemeItem[] = [
  { name: 'Artificial Intelligence', count: 27, following: true },
  { name: 'Clean Energy', count: 34, following: true },
  { name: 'Cybersecurity', count: 19, following: true },
  { name: 'Biotech & Genomics', count: 41, following: false },
  { name: 'Defense & Aerospace', count: 22, following: false },
  { name: 'Semiconductors', count: 31, following: false },
  { name: 'Consumer Discretionary', count: 58, following: false },
  { name: 'Emerging Markets', count: 47, following: false },
];

@Component({
  selector: 'app-themes-card',
  standalone: false,
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.css',
})
export class ThemesCardComponent {
  @Input() filter: 'all' | 'following' | 'not_following' = 'all';

  get visibleThemes(): ThemeItem[] {
    if (this.filter === 'following') return THEMES_DATA.filter(t => t.following);
    if (this.filter === 'not_following') return THEMES_DATA.filter(t => !t.following);
    return THEMES_DATA;
  }

  get followingCount(): number { return THEMES_DATA.filter(t => t.following).length; }
  get totalCount(): number { return THEMES_DATA.length; }

  get title(): string {
    if (this.filter === 'following') return `Themes you follow (${this.followingCount})`;
    if (this.filter === 'not_following') return `Themes not following (${this.totalCount - this.followingCount})`;
    return `Investment Themes — ${this.followingCount} of ${this.totalCount} followed`;
  }
}
