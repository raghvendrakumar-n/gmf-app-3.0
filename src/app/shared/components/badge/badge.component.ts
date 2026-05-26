import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: false,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  @Input() text = '';
  @Input() color: 'g' | 'r' | 'a' | 'b' | 'n' | 'p' | 'gold' = 'n';

  get colorClasses(): string {
    const map: Record<string, string> = {
      g: 'bg-teal-50 text-teal-800 border-teal-200',
      r: 'bg-red-50 text-red-700 border-red-200',
      a: 'bg-amber-50 text-gold-700 border-amber-200',
      b: 'bg-blue-50 text-blue-700 border-blue-200',
      n: 'bg-ink-100 text-ink-700 border-ink-300',
      p: 'bg-purple-50 text-purple-900 border-purple-200',
      gold: 'bg-gold-400 text-ink-950 border-gold-500',
    };
    return map[this.color] || map['n'];
  }
}
