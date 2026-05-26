import { Component, inject } from '@angular/core';
import { AssessmentService } from '../../../core/services/assessment.service';

@Component({
  selector: 'app-assessment-overlay',
  standalone: false,
  templateUrl: './assessment-overlay.component.html',
  styleUrl: './assessment-overlay.component.css',
})
export class AssessmentOverlayComponent {
  private assessmentService = inject(AssessmentService);
  state$ = this.assessmentService.state$;

  get currentSection() {
    const state = this.assessmentService.state;
    if (!state.data) return null;
    return state.data.sections[state.sectionIdx];
  }

  get progress(): number {
    const state = this.assessmentService.state;
    if (!state.data) return 0;
    return Math.round((state.sectionIdx / state.data.sections.length) * 100);
  }

  selectAnswer(questionId: string, optionId: string): void {
    this.assessmentService.selectAnswer(questionId, optionId);
  }

  next(): void {
    this.assessmentService.next();
  }

  back(): void {
    this.assessmentService.back();
  }

  close(): void {
    this.assessmentService.close();
  }

  isAnswered(questionId: string): boolean {
    return !!this.assessmentService.state.answers[questionId];
  }

  isSelected(questionId: string, optionId: string): boolean {
    return this.assessmentService.state.answers[questionId] === optionId;
  }

  allAnswered(): boolean {
    const section = this.currentSection;
    if (!section) return false;
    return section.questions.every((q) => !!this.assessmentService.state.answers[q.id]);
  }
}
