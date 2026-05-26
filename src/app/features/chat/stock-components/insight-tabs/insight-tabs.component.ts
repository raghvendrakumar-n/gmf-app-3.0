import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-insight-tabs',
  standalone: false,
  templateUrl: './insight-tabs.component.html',
  styleUrl: './insight-tabs.component.css',
})
export class InsightTabsComponent {
  @Input() tabs: string[] = ['Overview', 'Technical', 'Fundamental', 'Sentiment'];
  activeIndex = 0;
}
