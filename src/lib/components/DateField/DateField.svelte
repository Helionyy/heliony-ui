<script lang="ts">
  import { DatePicker } from 'bits-ui';
  import CalendarDays from '@lucide/svelte/icons/calendar-days';
  import ChevronLeft from '@lucide/svelte/icons/chevron-left';
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import type { DateValue } from '@internationalized/date';
  import { cn } from '../../utils/cn.js';
  import { useHeliony, useStrings } from '../../i18n/context.svelte.js';
  import { inputClasses } from '../Input/Input.svelte';
  import { useField } from '../Field/context.svelte.js';
  import { calendarClasses } from '../Calendar/Calendar.svelte';

  type Props = {
    value?: DateValue;
    placeholder?: DateValue;
    minValue?: DateValue;
    maxValue?: DateValue;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    id?: string;
    isDateDisabled?: (date: DateValue) => boolean;
    isDateUnavailable?: (date: DateValue) => boolean;
    onchange?: (value: DateValue | undefined) => void;
    class?: string;
  };
  let { value = $bindable(), placeholder = $bindable(), minValue, maxValue, locale, weekStartsOn = 1, size = 'md', disabled, readonly = false, required, invalid, name, id, isDateDisabled, isDateUnavailable, onchange, class: className }: Props = $props();
  const cfg = useHeliony();
  const t = useStrings();
  const field = useField();
  const loc = $derived(locale ?? cfg.locale);
  const isInvalid = $derived(invalid ?? field?.invalid ?? false);
  const isDisabled = $derived(disabled ?? field?.disabled ?? false);
  const heights = { sm: 'h-control-sm text-label', md: 'h-control-md', lg: 'h-control-lg' } as const;
</script>

<DatePicker.Root bind:value bind:placeholder {minValue} {maxValue} locale={loc} {weekStartsOn} disabled={isDisabled} {readonly} required={required ?? field?.required} {isDateDisabled} {isDateUnavailable} granularity="day" weekdayFormat="short" fixedWeeks onValueChange={(v) => onchange?.(v)}>
  {#if name}<input type="hidden" {name} value={value ? value.toString() : ""} />{/if}
  <DatePicker.Input id={id ?? field?.id} aria-invalid={isInvalid || undefined} aria-describedby={field?.describedBy} data-invalid={isInvalid || undefined}
    class={cn(inputClasses, heights[size], 'gap-0 px-3 tabular has-[[data-focused]]:border-fg-tertiary has-[[data-focused]]:outline-2 has-[[data-focused]]:outline-offset-2 has-[[data-focused]]:outline-focus-ring', className)}>
    {#snippet children({ segments })}
      <span class="flex min-w-0 flex-1 items-center">
        {#each segments as { part, value: v }, i (i)}
          {#if part === 'literal'}
            <DatePicker.Segment {part} class="px-px text-fg-tertiary">{v}</DatePicker.Segment>
          {:else}
            <DatePicker.Segment {part} class="rounded-xs px-0.5 outline-none data-placeholder:text-fg-tertiary focus:bg-surface-control-active focus:text-fg-primary aria-[valuetext=Empty]:text-fg-tertiary">{v}</DatePicker.Segment>
          {/if}
        {/each}
      </span>
      <DatePicker.Trigger aria-label={t.date.pick} class="-me-1 flex size-6 shrink-0 items-center justify-center rounded-xs text-fg-tertiary outline-none transition-colors duration-fast hover:text-fg-primary focus-visible:ring-focus">
        <CalendarDays aria-hidden="true" class="size-icon-sm" />
      </DatePicker.Trigger>
    {/snippet}
  </DatePicker.Input>
  <DatePicker.Portal>
    <DatePicker.Content sideOffset={6} class="hy-float z-overlay origin-(--bits-date-picker-content-transform-origin) rounded-lg border border-line-subtle bg-surface-overlay shadow-overlay outline-none">
      <DatePicker.Calendar class="inline-flex flex-col gap-3 p-3 text-fg-primary">
        {#snippet children({ months, weekdays })}
          <DatePicker.Header class={calendarClasses.nav}>
            <DatePicker.PrevButton class={calendarClasses.navButton} aria-label={t.date.prevMonth}><ChevronLeft aria-hidden="true" /></DatePicker.PrevButton>
            <DatePicker.Heading class={calendarClasses.heading} />
            <DatePicker.NextButton class={calendarClasses.navButton} aria-label={t.date.nextMonth}><ChevronRight aria-hidden="true" /></DatePicker.NextButton>
          </DatePicker.Header>
          {#each months as month (month.value.toString())}
            <DatePicker.Grid class={calendarClasses.grid}>
              <DatePicker.GridHead>
                <DatePicker.GridRow class="flex">
                  {#each weekdays as day (day)}<DatePicker.HeadCell class={calendarClasses.headCell}>{day.slice(0, 2)}</DatePicker.HeadCell>{/each}
                </DatePicker.GridRow>
              </DatePicker.GridHead>
              <DatePicker.GridBody>
                {#each month.weeks as week (week[0]?.toString())}
                  <DatePicker.GridRow class="mt-1 flex w-full">
                    {#each week as date (date.toString())}
                      <DatePicker.Cell {date} month={month.value} class={calendarClasses.cell}><DatePicker.Day class={calendarClasses.day} /></DatePicker.Cell>
                    {/each}
                  </DatePicker.GridRow>
                {/each}
              </DatePicker.GridBody>
            </DatePicker.Grid>
          {/each}
        {/snippet}
      </DatePicker.Calendar>
    </DatePicker.Content>
  </DatePicker.Portal>
</DatePicker.Root>
