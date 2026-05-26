import { Assessment } from '../models/assessment.model';

export const ASSESSMENT_DATA: Record<string, Assessment> = {
  money_persona: {
    type: 'money_persona',
    label: 'Money Persona Assessment',
    icon: '🦉',
    resultTitle: 'Your Money Persona',
    sections: [
      {
        id: 'mp-1', title: 'Decision Making Style',
        desc: 'These questions explore how you approach financial decisions under uncertainty.',
        questions: [
          { id: 'mp1q1', text: 'When evaluating an investment opportunity, what is your primary approach?', options: [{ id: 'a', text: 'I research extensively and only act when confident in the data' }, { id: 'b', text: 'I rely on gut instinct and past experience' }, { id: 'c', text: 'I follow what successful investors are doing' }, { id: 'd', text: 'I balance research with my emotional read' }] },
          { id: 'mp1q2', text: 'How do you react when an investment drops 15% in a week?', options: [{ id: 'a', text: 'Review my original thesis — if intact, I hold or add' }, { id: 'b', text: 'Feel anxious but wait it out' }, { id: 'c', text: 'Immediately research the driver' }, { id: 'd', text: 'Consider it a signal to exit' }] },
          { id: 'mp1q3', text: 'How much time per week do you spend thinking about investments?', options: [{ id: 'a', text: 'Less than 1 hour' }, { id: 'b', text: '1–3 hours' }, { id: 'c', text: '3–7 hours' }, { id: 'd', text: 'More than 7 hours' }] },
        ]
      },
      {
        id: 'mp-2', title: 'Risk Relationship',
        desc: 'Understanding your emotional and practical relationship with investment risk.',
        questions: [
          { id: 'mp2q1', text: 'Which statement best describes your view on investment losses?', options: [{ id: 'a', text: 'Losses are part of investing' }, { id: 'b', text: 'Losses are painful but acceptable if thesis was sound' }, { id: 'c', text: 'I try hard to avoid losses' }, { id: 'd', text: 'Losses motivate me to improve' }] },
          { id: 'mp2q2', text: 'How do you feel about holding concentrated positions (>20%)?', options: [{ id: 'a', text: 'Comfortable with high conviction' }, { id: 'b', text: 'Prefer diversification' }, { id: 'c', text: 'Only if I know it exceptionally well' }, { id: 'd', text: 'I avoid it entirely' }] },
          { id: 'mp2q3', text: 'How do market corrections affect your broader decisions?', options: [{ id: 'a', text: 'They don\'t — investment money is separate' }, { id: 'b', text: 'Make me more conservative overall' }, { id: 'c', text: 'I see them as buying opportunities' }, { id: 'd', text: 'I reassess my full financial picture' }] },
        ]
      },
      {
        id: 'mp-3', title: 'Goal & Time Orientation',
        desc: 'How your goals and time horizon shape your investing approach.',
        questions: [
          { id: 'mp3q1', text: 'What is your primary motivation for investing?', options: [{ id: 'a', text: 'Building long-term wealth' }, { id: 'b', text: 'Growing income' }, { id: 'c', text: 'Beating the market' }, { id: 'd', text: 'Specific goals' }] },
          { id: 'mp3q2', text: 'How far into the future do you think when investing?', options: [{ id: 'a', text: 'Days to weeks' }, { id: 'b', text: 'Months' }, { id: 'c', text: '1–3 years' }, { id: 'd', text: '5+ years' }] },
          { id: 'mp3q3', text: 'How do you approach new investment ideas from others?', options: [{ id: 'a', text: 'I filter them out — only my own research' }, { id: 'b', text: 'Starting points but I do my own diligence' }, { id: 'c', text: 'If credible, I take a small position quickly' }, { id: 'd', text: 'Sceptical but curious' }] },
        ]
      }
    ]
  },
  risk_profile: {
    type: 'risk_profile',
    label: 'Risk Profile Assessment',
    icon: '⚖️',
    resultTitle: 'Your Risk Profile',
    sections: [
      {
        id: 'rp-1', title: 'Financial Situation',
        desc: 'Your current financial position shapes how much risk you can afford.',
        questions: [
          { id: 'rp1q1', text: 'What proportion of liquid net worth is in investments?', options: [{ id: 'a', text: 'Less than 20%' }, { id: 'b', text: '20–40%' }, { id: 'c', text: '40–65%' }, { id: 'd', text: 'More than 65%' }] },
          { id: 'rp1q2', text: 'If your portfolio dropped 30%, how would daily life be affected?', options: [{ id: 'a', text: 'Not at all' }, { id: 'b', text: 'Minimal impact' }, { id: 'c', text: 'Moderate impact' }, { id: 'd', text: 'Significant impact' }] },
          { id: 'rp1q3', text: 'How stable is your primary income source?', options: [{ id: 'a', text: 'Very stable' }, { id: 'b', text: 'Mostly stable' }, { id: 'c', text: 'Variable' }, { id: 'd', text: 'Highly variable' }] },
        ]
      },
      {
        id: 'rp-2', title: 'Volatility Tolerance',
        desc: 'How you respond to portfolio swings.',
        questions: [
          { id: 'rp2q1', text: 'Which scenario matches your ideal risk/return tradeoff?', options: [{ id: 'a', text: '+5%/year, rarely down >5%' }, { id: 'b', text: '+8%, occasionally down 10–15%' }, { id: 'c', text: '+11%, sometimes down 20–25%' }, { id: 'd', text: '+15%+, could be down 35–40%' }] },
          { id: 'rp2q2', text: 'How long will you wait for a losing position to recover?', options: [{ id: 'a', text: '3–6 months' }, { id: 'b', text: '6–18 months' }, { id: 'c', text: '1–3 years' }, { id: 'd', text: 'As long as it takes' }] },
          { id: 'rp2q3', text: 'Have you experienced a significant portfolio loss (>20%)?', options: [{ id: 'a', text: 'No — and it concerns me' }, { id: 'b', text: 'No — but I could handle it' }, { id: 'c', text: 'Yes — difficult but I held' }, { id: 'd', text: 'Yes — stayed calm, saw opportunity' }] },
        ]
      },
      {
        id: 'rp-3', title: 'Investment Horizon & Goals',
        desc: 'Time horizon is a key determinant of appropriate risk.',
        questions: [
          { id: 'rp3q1', text: 'When do you expect to need your invested capital?', options: [{ id: 'a', text: 'Within 2 years' }, { id: 'b', text: '2–5 years' }, { id: 'c', text: '5–10 years' }, { id: 'd', text: 'More than 10 years' }] },
          { id: 'rp3q2', text: 'Which best describes your investment objective?', options: [{ id: 'a', text: 'Capital preservation' }, { id: 'b', text: 'Income generation' }, { id: 'c', text: 'Balanced growth' }, { id: 'd', text: 'Aggressive growth' }] },
          { id: 'rp3q3', text: 'How would you describe your investment experience?', options: [{ id: 'a', text: 'Beginner' }, { id: 'b', text: 'Intermediate' }, { id: 'c', text: 'Experienced' }, { id: 'd', text: 'Advanced' }] },
        ]
      }
    ]
  },
  blind_spots: {
    type: 'blind_spots',
    label: 'Decision Blind Spots Assessment',
    icon: '🔍',
    resultTitle: 'Your Decision Blind Spots',
    sections: [
      {
        id: 'bs-1', title: 'Cognitive Biases',
        desc: 'These questions surface unconscious patterns in financial information processing.',
        questions: [
          { id: 'bs1q1', text: 'When you read negative news about a stock you own, your first reaction?', options: [{ id: 'a', text: 'Look for contrary data confirming my thesis' }, { id: 'b', text: 'Take it seriously and re-examine objectively' }, { id: 'c', text: 'Dismiss it quickly — short-term noise' }, { id: 'd', text: 'Feel anxious, tempted to sell' }] },
          { id: 'bs1q2', text: 'Looking back, which pattern do you recognise most?', options: [{ id: 'a', text: 'Held losers too long' }, { id: 'b', text: 'Sold winners too early' }, { id: 'c', text: 'Waited and missed entries' }, { id: 'd', text: 'Acted impulsively on news' }] },
          { id: 'bs1q3', text: 'When a stock you considered but didn\'t buy rises significantly?', options: [{ id: 'a', text: 'Fine — other opportunities exist' }, { id: 'b', text: 'Frustrated, second-guess reasoning' }, { id: 'c', text: 'Sometimes chase it after the move' }, { id: 'd', text: 'Note it as a lesson' }] },
        ]
      },
      {
        id: 'bs-2', title: 'Information Processing',
        desc: 'How you seek, weight, and act on financial information.',
        questions: [
          { id: 'bs2q1', text: 'Which sources carry the most weight for you?', options: [{ id: 'a', text: 'Quantitative data' }, { id: 'b', text: 'Qualitative factors' }, { id: 'c', text: 'Community consensus' }, { id: 'd', text: 'All systematically weighted' }] },
          { id: 'bs2q2', text: 'How often do you seek information that challenges your views?', options: [{ id: 'a', text: 'Rarely — I trust my research' }, { id: 'b', text: 'Sometimes' }, { id: 'c', text: 'Regularly' }, { id: 'd', text: 'Always — bear case first' }] },
          { id: 'bs2q3', text: 'When a credible analyst publishes a contrarian view, you typically:', options: [{ id: 'a', text: 'Read carefully and update estimates' }, { id: 'b', text: 'Skim but weight confirming views' }, { id: 'c', text: 'Ignore unless from trusted source' }, { id: 'd', text: 'Immediately reconsider position' }] },
        ]
      },
      {
        id: 'bs-3', title: 'Behavioural Patterns',
        desc: 'Understanding how emotions and social influences shape your actions.',
        questions: [
          { id: 'bs3q1', text: 'How does market sentiment affect your investment activity?', options: [{ id: 'a', text: 'Strongly — bulls make me aggressive' }, { id: 'b', text: 'Moderately — I try to counter emotions' }, { id: 'c', text: 'Minimally — focus on fundamentals' }, { id: 'd', text: 'Inversely — buy when negative' }] },
          { id: 'bs3q2', text: 'When multiple people are excited about the same investment?', options: [{ id: 'a', text: 'Get interested and research it' }, { id: 'b', text: 'Become more sceptical' }, { id: 'c', text: 'Feel FOMO but hold process' }, { id: 'd', text: 'Ignore social signals entirely' }] },
          { id: 'bs3q3', text: 'How do you behave before a major decision deadline?', options: [{ id: 'a', text: 'Stick to pre-determined plan' }, { id: 'b', text: 'Sometimes make last-minute changes' }, { id: 'c', text: 'Prefer to defer if possible' }, { id: 'd', text: 'Time pressure doesn\'t affect quality' }] },
        ]
      }
    ]
  }
};
