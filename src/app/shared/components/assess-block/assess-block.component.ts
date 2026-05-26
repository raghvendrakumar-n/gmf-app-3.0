import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assess-block',
  standalone: false,
  templateUrl: './assess-block.component.html',
  styleUrl: './assess-block.component.css',
})
export class AssessBlockComponent {
  @Input() label = '';
  @Input() variant: '' | 'amber' | 'blue' | 'red' = '';

  get variantClasses(): string {
    const map: Record<string, string> = {
      '': 'border-teal-500 bg-teal-50',
      amber: 'border-gold-500 bg-amber-50',
      blue: 'border-info bg-blue-50',
      red: 'border-danger bg-red-50',
    };
    return map[this.variant] || map[''];
  }
}
