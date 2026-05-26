import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-signal-bars',
  standalone: false,
  templateUrl: './signal-bars.component.html',
  styleUrl: './signal-bars.component.css',
})
export class SignalBarsComponent {
  @Input() filled = 0;
  @Input() total = 5;
  @Input() color: 'g' | 'r' | 'a' = 'g';

  get bars(): number[] {
    return Array(this.total).fill(0);
  }

  get activeColor(): string {
    const map: Record<string, string> = {
      g: 'bg-teal-500',
      r: 'bg-danger',
      a: 'bg-gold-500',
    };
    return map[this.color] || map['g'];
  }
}
