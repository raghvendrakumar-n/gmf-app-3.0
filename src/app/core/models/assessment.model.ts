export interface AssessmentOption {
  id: string;
  text: string;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: AssessmentOption[];
}

export interface AssessmentSection {
  id: string;
  title: string;
  desc: string;
  questions: AssessmentQuestion[];
}

export interface Assessment {
  type: 'money_persona' | 'risk_profile' | 'blind_spots';
  label: string;
  icon: string;
  resultTitle: string;
  sections: AssessmentSection[];
}

export interface AssessmentState {
  type: string | null;
  data: Assessment | null;
  sectionIdx: number;
  answers: Record<string, string>;
  complete: boolean;
}

export interface PersonaResult {
  name: string;
  emoji: string;
  desc: string;
  traits: [string, number][];
}

export interface RiskResult {
  profile: string;
  emoji: string;
  desc: string;
  equity: string;
  drawdown: string;
  horizon: string;
}

export interface BlindSpot {
  name: string;
  sev: 'HIGH' | 'MEDIUM' | 'LOW';
  desc: string;
}
