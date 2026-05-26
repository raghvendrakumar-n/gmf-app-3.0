import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-health-score-gauge',
  standalone: false,
  templateUrl: './health-score-gauge.component.html',
  styleUrl: './health-score-gauge.component.css',
})
export class HealthScoreGaugeComponent implements AfterViewInit {
  @ViewChild('gaugeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() score = 0;
  @Input() zoneLabel = '';
  @Input() zoneColor = '';

  ngAfterViewInit(): void { this.drawGauge(); }

  private drawGauge(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cx = 90, cy = 90, r = 70;
    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;
    const scoreAngle = startAngle + (this.score / 100) * Math.PI;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = '#e5e7eb';
    ctx.stroke();
    const gradient = ctx.createLinearGradient(0, 0, 180, 0);
    gradient.addColorStop(0, '#ef4444');
    gradient.addColorStop(0.5, '#f59e0b');
    gradient.addColorStop(1, '#10b981');
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, scoreAngle);
    ctx.strokeStyle = gradient;
    ctx.stroke();
  }
}
