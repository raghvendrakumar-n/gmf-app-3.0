import { Component, Input, inject } from '@angular/core';
import { StockDataService } from '../../../../core/services/stock-data.service';
import { SectorData } from '../../../../core/models/stock.model';

@Component({
  selector: 'app-sector-pulse-card',
  standalone: false,
  templateUrl: './sector-pulse.component.html',
  styleUrl: './sector-pulse.component.css',
})
export class SectorPulseCardComponent {
  @Input() sector = '';
  private stockDataService = inject(StockDataService);

  get sectorData(): SectorData { return this.stockDataService.getSectorData(this.sector); }

  get sectorLabel(): string {
    return this.sector ? this.sector.charAt(0).toUpperCase() + this.sector.slice(1) : 'Sector';
  }

  get signalLabel(): string {
    if (this.sectorData.sig === 'BULLISH') return 'Bullish trend';
    if (this.sectorData.sig === 'BEARISH') return 'Bearish trend';
    return 'Neutral trend';
  }

  get signalColor(): string {
    if (this.sectorData.sc === 'g') return 'text-teal-600';
    if (this.sectorData.sc === 'r') return 'text-danger';
    return 'text-amber-600';
  }

  get changeBadgeClasses(): string {
    if (this.sectorData.sc === 'g') return 'bg-teal-50 text-teal-700 border-teal-200';
    if (this.sectorData.sc === 'r') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  }
}
