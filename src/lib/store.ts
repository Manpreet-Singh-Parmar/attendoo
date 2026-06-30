import { t } from './i18n';

export interface Subject {
  id: string;
  name: string;
  present: number;
  total: number;
  target: number;
}

export interface Feedback {
  percentage: number;
  status: 'safe' | 'risk';
  classes: number;
  neededFixed?: number;
  extraAttended?: number;
  targetTotalPresent: number;
  message: string;
  detail: string;
}

export function loadSubjects(): Subject[] {
  const stored = localStorage.getItem('Attendo_subjects');
  if (stored) {
    try { return JSON.parse(stored); } catch { return []; }
  }
  return [];
}

export function saveSubjects(subjects: Subject[]): void {
  localStorage.setItem('Attendo_subjects', JSON.stringify(subjects));
}

export function loadDefaultTarget(): number {
  const stored = localStorage.getItem('Attendo_global_target');
  return stored ? parseInt(stored, 10) : 75;
}

export function saveDefaultTarget(target: number): void {
  localStorage.setItem('Attendo_global_target', target.toString());
}

export function computeFeedback(present: number, total: number, targetPercent: number): Feedback {
  const target = targetPercent / 100;
  const currentPercent = total > 0 ? (present / total) * 100 : 0;

  if (total === 0) {
    return {
      percentage: 0,
      status: 'safe',
      classes: 0,
      neededFixed: 0,
      targetTotalPresent: 0,
      message: 'No classes have been conducted yet. You have perfect standing.',
      detail: 'Go to your first classes to establish your attendance history.'
    };
  }

  if (currentPercent < targetPercent) {
    const needed = Math.ceil((target * total - present) / (1 - target));
    const targetTotalPresent = Math.ceil(target * total);
    const neededFixed = Math.max(0, targetTotalPresent - present);

    return {
      percentage: currentPercent,
      status: 'risk',
      classes: needed,
      neededFixed,
      targetTotalPresent,
      message: `Attend next ${needed} class${needed > 1 ? 'es' : ''} consecutively.`,
      detail: `<strong>Ongoing Semester:</strong> Attend the next <span class="text-ink dark:text-white font-semibold">${needed}</span> class${needed > 1 ? 'es' : ''} consecutively (brings you to ${((present + needed) / (total + needed) * 100).toFixed(1)}% or ${present + needed}/${total + needed} classes).<br/><span class="block mt-1.5"><strong>Fixed Total:</strong> Reach <span class="text-ink dark:text-white font-semibold">${targetTotalPresent}</span> attended classes out of ${total} total semester classes (requiring <span class="text-ink dark:text-white font-semibold">${neededFixed}</span> more class${neededFixed !== 1 ? 'es' : ''} to reach ${targetPercent}%).</span>`
    };
  } else {
    const canBunk = Math.floor((present - target * total) / target);
    const targetTotalPresent = Math.ceil(target * total);
    const extraAttended = present - targetTotalPresent;

    return {
      percentage: currentPercent,
      status: 'safe',
      classes: canBunk,
      extraAttended,
      targetTotalPresent,
      message: canBunk > 0 ? `You can safely bunk ${canBunk} class${canBunk > 1 ? 'es' : ''}.` : `You are on the limit. Cannot miss any classes.`,
      detail: canBunk > 0
        ? `<strong>Ongoing Semester:</strong> Missing the next <span class="text-ink dark:text-white font-semibold">${canBunk}</span> class${canBunk > 1 ? 'es' : ''} consecutively drops you to ${(present / (total + canBunk) * 100).toFixed(1)}%.<br/><span class="block mt-1.5"><strong>Fixed Total:</strong> You have <span class="text-ink dark:text-white font-semibold">${extraAttended}</span> extra attended class${extraAttended !== 1 ? 'es' : ''} beyond the required ${targetTotalPresent}/${total} classes.</span>`
        : `Missing even 1 upcoming class will drop your attendance below the required ${targetPercent}%.`
    };
  }
}
