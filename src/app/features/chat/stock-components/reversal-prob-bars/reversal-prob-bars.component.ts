import { Component, Input } from '@angular/core';

export interface ReversalBar {
  label: string;
  pct: number;
  color: string;
}

@Component({
  selector: 'app-reversal-prob-bars',
  standalone: false,
  templateUrl: './reversal-prob-bars.component.html',
  styleUrl: './reversal-prob-bars.component.css',
})
export class ReversalProbBarsComponent {
  @Input() bars: ReversalBar[] = [];
}
