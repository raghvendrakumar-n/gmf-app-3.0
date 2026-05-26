import { Component, Input } from '@angular/core';
import { ActionObject } from '../../../core/models/intent.model';

@Component({
  selector: 'app-response-card',
  standalone: false,
  templateUrl: './response-card.component.html',
  styleUrl: './response-card.component.css',
})
export class ResponseCardComponent {
  @Input() action: ActionObject | undefined;
}
