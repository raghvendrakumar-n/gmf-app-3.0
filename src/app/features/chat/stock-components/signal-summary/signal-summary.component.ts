import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-signal-summary',
  standalone: false,
  templateUrl: './signal-summary.component.html',
  styleUrl: './signal-summary.component.css',
})
export class SignalSummaryComponent {
  @Input() signals: { label: string; value: string; direction: string }[] = [];
}
