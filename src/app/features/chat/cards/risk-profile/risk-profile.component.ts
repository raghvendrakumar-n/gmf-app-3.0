import { Component } from '@angular/core';

@Component({
  selector: 'app-risk-profile-card',
  standalone: false,
  templateUrl: './risk-profile.component.html',
  styleUrl: './risk-profile.component.css',
})
export class RiskProfileCardComponent {
  rows = [
    { label: 'Equity allocation', badge: '70%', badgeClass: 'bg-teal-50 text-teal-800 border-teal-200' },
    { label: 'Max drawdown comfort', badge: 'Up to 20%', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Time horizon', badge: '7–10 years', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Rebalance frequency', badge: 'Quarterly', badgeClass: 'bg-ink-100 text-ink-700 border-ink-200' },
  ];
}
