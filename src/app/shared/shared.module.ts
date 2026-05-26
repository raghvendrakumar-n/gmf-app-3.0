import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeComponent } from './components/badge/badge.component';
import { StatBoxComponent } from './components/stat-box/stat-box.component';
import { DataRowComponent } from './components/data-row/data-row.component';
import { SignalBarsComponent } from './components/signal-bars/signal-bars.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { AssessBlockComponent } from './components/assess-block/assess-block.component';

const COMPONENTS = [
  BadgeComponent,
  StatBoxComponent,
  DataRowComponent,
  SignalBarsComponent,
  ProgressBarComponent,
  AssessBlockComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule],
  exports: COMPONENTS,
})
export class SharedModule {}
