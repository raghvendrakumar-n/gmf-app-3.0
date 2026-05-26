import { Component } from '@angular/core';

interface GoalItem {
  icon: string;
  name: string;
  status: string;
  badgeClass: string;
  progress: number;
  barColor: string;
  current: string;
  target: string;
  date: string;
}

@Component({
  selector: 'app-goals-card',
  standalone: false,
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css',
})
export class GoalsCardComponent {
  goals: GoalItem[] = [
    { icon: '🏠', name: 'Down payment', status: 'On Track', badgeClass: 'bg-teal-50 text-teal-800 border-teal-200', progress: 62, barColor: 'var(--color-teal-600)', current: '$62,000', target: '$100,000', date: 'Dec 2027' },
    { icon: '🎓', name: 'College fund', status: 'Behind', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200', progress: 38, barColor: 'var(--color-gold-500)', current: '$19,000', target: '$50,000', date: 'Sep 2030' },
    { icon: '🌴', name: 'Early retirement', status: 'Early', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200', progress: 22, barColor: 'var(--color-info)', current: '$110,000', target: '$500,000', date: '2038' },
  ];
}
