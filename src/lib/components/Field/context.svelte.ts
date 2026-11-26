import { createContext } from 'svelte';

export type FieldContext = {
  readonly id: string;
  readonly describedBy: string | undefined;
  readonly invalid: boolean;
  readonly disabled: boolean;
  readonly required: boolean;
};

const [get, set, has] = createContext<FieldContext>();

export const setFieldContext = (ctx: FieldContext) => set(ctx);
export const useField = (): FieldContext | null => (has() ? get() : null);
