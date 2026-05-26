import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-row',
  standalone: false,
  templateUrl: './data-row.component.html',
  styleUrl: './data-row.component.css',
})
export class DataRowComponent {
  @Input() ticker = '';
  @Input() name = '';
  @Input() price = '';
}
