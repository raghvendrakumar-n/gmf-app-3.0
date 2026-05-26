import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-box',
  standalone: false,
  templateUrl: './stat-box.component.html',
  styleUrl: './stat-box.component.css',
})
export class StatBoxComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() change = '';
  @Input() changeClass = '';
}
