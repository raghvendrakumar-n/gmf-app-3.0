import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AssessmentOverlayComponent } from './assessment-overlay/assessment-overlay.component';

@NgModule({
  declarations: [AssessmentOverlayComponent],
  imports: [CommonModule, SharedModule],
  exports: [AssessmentOverlayComponent],
})
export class AssessmentModule {}
