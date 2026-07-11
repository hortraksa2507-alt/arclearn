export type TaskPriority = "low" | "medium" | "high";

export interface DurationEstimate {
  minutes: number;
  confidence: "low" | "medium" | "high";
  reasoning: string;
}

const KEYWORD_WEIGHTS: Record<string, number> = {
  read: 20,
  review: 25,
  essay: 90,
  write: 60,
  draft: 45,
  research: 75,
  study: 40,
  practice: 35,
  exam: 120,
  quiz: 30,
  homework: 45,
  assignment: 60,
  project: 120,
  presentation: 90,
  lab: 50,
  problem: 25,
  chapter: 35,
  notes: 20,
  summarize: 30,
  outline: 25,
  code: 60,
  debug: 45,
  autocad: 50,
  drawing: 55,
  model: 70,
  render: 80,
};

const COMPLEXITY_MODIFIERS = [
  { pattern: /\b(final|thesis|capstone|comprehensive)\b/i, multiplier: 1.8 },
  { pattern: /\b(quick|brief|short|skim)\b/i, multiplier: 0.5 },
  { pattern: /\b(detailed|thorough|deep|comprehensive)\b/i, multiplier: 1.4 },
  { pattern: /\b(group|team|collaborative)\b/i, multiplier: 1.2 },
  { pattern: /\b(\d+)\s*(page|pages|pg)\b/i, multiplier: 0 }, // handled separately
  { pattern: /\b(\d+)\s*(min|mins|minute|minutes)\b/i, multiplier: 0 }, // handled separately
  { pattern: /\b(\d+)\s*(hr|hrs|hour|hours)\b/i, multiplier: 0 },
];

function roundToNearestFive(n: number): number {
  return Math.max(5, Math.round(n / 5) * 5);
}

export function estimateTaskDuration(
  title: string,
  priority: TaskPriority = "medium"
): DurationEstimate {
  const text = title.toLowerCase().trim();
  if (!text) {
    return { minutes: 30, confidence: "low", reasoning: "Default estimate for empty task" };
  }

  const explicitMinutes = text.match(/\b(\d+)\s*(min|mins|minute|minutes)\b/i);
  if (explicitMinutes) {
    const mins = parseInt(explicitMinutes[1], 10);
    return {
      minutes: roundToNearestFive(mins),
      confidence: "high",
      reasoning: "You specified the duration directly",
    };
  }

  const explicitHours = text.match(/\b(\d+(?:\.\d+)?)\s*(hr|hrs|hour|hours)\b/i);
  if (explicitHours) {
    const mins = parseFloat(explicitHours[1]) * 60;
    return {
      minutes: roundToNearestFive(mins),
      confidence: "high",
      reasoning: "You specified the duration in hours",
    };
  }

  const pageMatch = text.match(/\b(\d+)\s*(page|pages|pg)\b/i);
  if (pageMatch) {
    const pages = parseInt(pageMatch[1], 10);
    const mins = roundToNearestFive(pages * 12);
    return {
      minutes: mins,
      confidence: "high",
      reasoning: `~12 min per page × ${pages} pages`,
    };
  }

  let baseMinutes = 30;
  const matchedKeywords: string[] = [];

  for (const [keyword, weight] of Object.entries(KEYWORD_WEIGHTS)) {
    if (text.includes(keyword)) {
      baseMinutes = Math.max(baseMinutes, weight);
      matchedKeywords.push(keyword);
    }
  }

  let multiplier = 1;
  for (const { pattern, multiplier: m } of COMPLEXITY_MODIFIERS) {
    if (m === 0) continue;
    if (pattern.test(text)) multiplier *= m;
  }

  const priorityMultiplier = { low: 0.85, medium: 1, high: 1.15 }[priority];
  const minutes = roundToNearestFive(baseMinutes * multiplier * priorityMultiplier);

  let reasoning: string;
  let confidence: DurationEstimate["confidence"];

  if (matchedKeywords.length > 0) {
    reasoning = `Based on "${matchedKeywords.slice(0, 2).join('", "')}" task type`;
    confidence = matchedKeywords.length >= 2 ? "high" : "medium";
  } else {
    reasoning = "General study task estimate";
    confidence = "low";
  }

  if (multiplier !== 1) {
    reasoning += multiplier > 1 ? " · larger scope detected" : " · quick task detected";
  }

  return { minutes, confidence, reasoning };
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
