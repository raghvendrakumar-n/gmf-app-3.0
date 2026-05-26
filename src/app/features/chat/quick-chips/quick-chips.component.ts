import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-chips',
  standalone: false,
  templateUrl: './quick-chips.component.html',
  styleUrl: './quick-chips.component.css',
})
export class QuickChipsComponent {
  @Input() chips: string[] = [];
  @Output() chipClicked = new EventEmitter<string>();
}
