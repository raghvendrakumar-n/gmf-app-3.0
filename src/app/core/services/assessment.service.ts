import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Assessment,
  AssessmentState,
  PersonaResult,
  RiskResult,
  BlindSpot,
} from '../models/assessment.model';
import { ASSESSMENT_DATA } from './assessment-data';

@Injectable({ providedIn: 'root' })
export class AssessmentService {
  private stateSubject = new BehaviorSubject<AssessmentState>({
    type: null,
    data: null,
    sectionIdx: 0,
    answers: {},
    complete: false,
  });
  state$ = this.stateSubject.asObservable();

  get state(): AssessmentState {
    return this.stateSubject.value;
  }

  launch(type: string): void {
    const data = ASSESSMENT_DATA[type];
    if (!data) return;
    this.stateSubject.next({ type, data, sectionIdx: 0, answers: {}, complete: false });
  }

  selectAnswer(questionId: string, optionId: string): void {
    const current = this.stateSubject.value;
    this.stateSubject.next({
      ...current,
      answers: { ...current.answers, [questionId]: optionId },
    });
  }

  next(): boolean {
    const current = this.stateSubject.value;
    if (!current.data) return false;
    const isLast = current.sectionIdx === current.data.sections.length - 1;
    if (isLast) {
      this.stateSubject.next({ ...current, complete: true });
      return true;
    }
    this.stateSubject.next({ ...current, sectionIdx: current.sectionIdx + 1 });
    return false;
  }

  back(): void {
    const current = this.stateSubject.value;
    if (current.sectionIdx > 0) {
      this.stateSubject.next({ ...current, sectionIdx: current.sectionIdx - 1 });
    }
  }

  close(): void {
    this.stateSubject.next({
      type: null, data: null, sectionIdx: 0, answers: {}, complete: false,
    });
  }

  buildPersonaReport(answers: Record<string, string>): PersonaResult {
    const scores: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
    Object.values(answers).forEach((v) => { if (scores[v] !== undefined) scores[v]++; });
    const top = Object.entries(scores).sort((x, y) => y[1] - x[1])[0][0];
    const personas: Record<string, PersonaResult> = {
      a: { name: 'The Strategist', emoji: '🦉', desc: 'You are data-driven, deliberate, and disciplined.', traits: [['Research depth', 92], ['Emotional discipline', 88], ['Long-term focus', 85], ['Contrarian thinking', 70], ['Social influence', 18]] },
      b: { name: 'The Guardian', emoji: '🛡', desc: 'Capital preservation drives your decisions.', traits: [['Capital preservation', 90], ['Consistency', 84], ['Risk aversion', 82], ['Patience', 75], ['Opportunism', 30]] },
      c: { name: 'The Networker', emoji: '🤝', desc: 'You learn through community and trusted sources.', traits: [['Social awareness', 88], ['Speed of action', 80], ['Network leverage', 85], ['Independent research', 45], ['Contrarian thinking', 25]] },
      d: { name: 'The Pragmatist', emoji: '⚙️', desc: 'You blend intuition with analysis.', traits: [['Adaptability', 90], ['Balanced thinking', 85], ['Emotional awareness', 78], ['System discipline', 62], ['Risk calibration', 70]] },
    };
    return personas[top];
  }

  buildRiskReport(answers: Record<string, string>): RiskResult {
    const scores: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
    Object.values(answers).forEach((v) => { if (scores[v] !== undefined) scores[v]++; });
    const avgScore = (scores['a'] * 1 + scores['b'] * 2 + scores['c'] * 3 + scores['d'] * 4) / Object.keys(answers).length;
    if (avgScore < 1.8) return { profile: 'Conservative', emoji: '🏦', desc: 'You prioritise capital preservation.', equity: '30–40%', drawdown: 'Up to 8%', horizon: '1–3 years' };
    if (avgScore < 2.5) return { profile: 'Moderate', emoji: '⚖️', desc: 'You seek balanced growth.', equity: '50–65%', drawdown: 'Up to 15%', horizon: '3–7 years' };
    if (avgScore < 3.3) return { profile: 'Moderate Growth', emoji: '📈', desc: 'Comfortable with meaningful volatility.', equity: '65–80%', drawdown: 'Up to 22%', horizon: '5–10 years' };
    return { profile: 'Aggressive Growth', emoji: '🚀', desc: 'Maximum long-term capital appreciation.', equity: '80–95%', drawdown: 'Up to 35%', horizon: '10+ years' };
  }

  buildBlindSpotsReport(answers: Record<string, string>): BlindSpot[] {
    const spots: BlindSpot[] = [];
    if (answers['bs1q1'] === 'a') spots.push({ name: 'Confirmation bias', sev: 'HIGH', desc: 'You tend to seek out information that confirms your existing thesis.' });
    if (answers['bs1q2'] === 'a' || answers['bs1q2'] === 'b') spots.push({ name: 'Disposition effect', sev: 'MEDIUM', desc: 'You may hold losers too long hoping for recovery.' });
    if (answers['bs1q3'] === 'c') spots.push({ name: 'FOMO-driven chasing', sev: 'HIGH', desc: 'You sometimes enter positions after the main move.' });
    if (answers['bs2q1'] === 'c') spots.push({ name: 'Authority reliance', sev: 'MEDIUM', desc: 'Over-weighting community consensus.' });
    if (answers['bs2q2'] === 'a' || answers['bs2q2'] === 'b') spots.push({ name: 'Confirmation seeking', sev: 'HIGH', desc: 'Rarely stress-testing your thesis.' });
    if (answers['bs3q1'] === 'a') spots.push({ name: 'Sentiment anchoring', sev: 'MEDIUM', desc: 'Market mood disproportionately affects your conviction.' });
    if (answers['bs3q2'] === 'a') spots.push({ name: 'Social proof bias', sev: 'MEDIUM', desc: 'Network excitement increases your interest.' });
    const aCount = Object.values(answers).filter((v) => v === 'a').length;
    if (aCount >= 4) spots.push({ name: 'Analysis paralysis', sev: 'HIGH', desc: 'Extensive research may cause missed opportunities.' });

    if (spots.length === 0) {
      return [
        { name: 'Anchoring bias', sev: 'MEDIUM', desc: 'You may give excessive weight to first information.' },
        { name: 'Recency bias', sev: 'LOW', desc: 'Recent performance may influence outlook more than warranted.' },
      ];
    }
    return spots.slice(0, 4);
  }
}
