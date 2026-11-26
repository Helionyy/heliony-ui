import type { IconComponent, Tone } from '../types.js';

export type ToastAction = { label: string; onclick: () => void };
export type ToastInput = {
  id?: string;
  title: string;
  description?: string;
  tone?: Tone;
  icon?: IconComponent;
  image?: string;
  imageMode?: 'side' | 'background';
  duration?: number | null;
  action?: ToastAction;
  dismissible?: boolean;
  key?: string;
};
export type ToastItem = Required<Pick<ToastInput, 'id' | 'title' | 'tone' | 'dismissible'>> & Omit<ToastInput, 'id' | 'title' | 'tone' | 'dismissible'> & { count: number; createdAt: number; updatedAt: number };

let seq = 0;
const items = $state<ToastItem[]>([]);
const timers = new Map<string, ReturnType<typeof setTimeout>>();

const schedule = (item: ToastItem) => {
  const prev = timers.get(item.id);
  if (prev) clearTimeout(prev);
  if (item.duration === null || item.duration === 0) return;
  timers.set(item.id, setTimeout(() => dismiss(item.id), item.duration ?? 5000));
};

export const push = (input: ToastInput): string => {
  const now = Date.now();
  const existing = input.key ? items.find((t) => t.key === input.key) : input.id ? items.find((t) => t.id === input.id) : undefined;
  if (existing) {
    Object.assign(existing, { ...input, id: existing.id, count: existing.count + 1, updatedAt: now, tone: input.tone ?? existing.tone, dismissible: input.dismissible ?? existing.dismissible });
    schedule(existing);
    return existing.id;
  }
  const id = input.id ?? `toast-${++seq}`;
  const item: ToastItem = { dismissible: true, tone: 'neutral', duration: 5000, ...input, id, count: 1, createdAt: now, updatedAt: now };
  items.push(item);
  schedule(item);
  return id;
};

export const dismiss = (id: string) => {
  const i = items.findIndex((t) => t.id === id);
  if (i >= 0) items.splice(i, 1);
  const timer = timers.get(id);
  if (timer) { clearTimeout(timer); timers.delete(id); }
};

export const clear = () => { for (const t of [...items]) dismiss(t.id); };

export const pause = (id: string) => { const timer = timers.get(id); if (timer) { clearTimeout(timer); timers.delete(id); } };
export const resume = (id: string) => { const item = items.find((t) => t.id === id); if (item) schedule(item); };

export const toast = Object.assign(push, {
  push, dismiss, clear, pause, resume,
  get items() { return items; },
  success: (title: string, description?: string) => push({ title, description, tone: 'success' }),
  error: (title: string, description?: string) => push({ title, description, tone: 'danger', duration: 8000 }),
  warning: (title: string, description?: string) => push({ title, description, tone: 'warning' }),
  info: (title: string, description?: string) => push({ title, description, tone: 'info' }),
});
