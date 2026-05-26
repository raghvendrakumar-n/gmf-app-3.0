import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-personal-alignment',
  standalone: false,
  templateUrl: './personal-alignment.component.html',
  styleUrl: './personal-alignment.component.css',
})
export class PersonalAlignmentComponent {
  @Input() items: { icon: string; label: string; value: string; sentiment: string }[] = [];
}
