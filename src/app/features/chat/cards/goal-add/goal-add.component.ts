import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-goal-add-card',
  standalone: false,
  templateUrl: './goal-add.component.html',
  styleUrl: './goal-add.component.css',
})
export class GoalAddCardComponent {
  @Output() goalSaved = new EventEmitter<string>();

  goalName = '';
  targetAmount = '';
  targetDate = '';
  priority = 'Medium';

  onSave(): void {
    this.goalSaved.emit('Show my goals');
  }
}
