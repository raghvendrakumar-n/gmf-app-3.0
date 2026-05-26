import { Component } from '@angular/core';

@Component({
  selector: 'app-blind-spots-card',
  standalone: false,
  templateUrl: './blind-spots.component.html',
  styleUrl: './blind-spots.component.css',
})
export class BlindSpotsCardComponent {
  spots = [
    { name: 'Analysis paralysis', sev: 'HIGH', desc: 'Delaying entry on valid buy signals due to over-analysis', badgeClass: 'bg-red-50 text-red-700 border-red-200' },
    { name: 'Over-diversification', sev: 'MEDIUM', desc: 'Too many positions diluting high-conviction opportunities', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' },
    { name: 'Recency bias', sev: 'MEDIUM', desc: 'Recent events over-weighted in allocation decisions', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' },
  ];
}
