<script lang="ts" module>
  export const calendarClasses = {
    nav: 'flex items-center justify-between gap-2 px-1',
    heading: 'text-body-strong text-fg-primary',
    navButton: 'inline-flex size-control-sm items-center justify-center rounded-md text-fg-secondary outline-none transition-colors duration-fast hover:bg-surface-control-hover hover:text-fg-primary focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-(--opacity-disabled) [&_svg]:size-icon-sm',
    grid: 'w-full border-collapse',
    headCell: 'size-8 text-center text-caption font-medium text-fg-tertiary',
    cell: 'relative size-8 p-0 text-center',
    day: [
      'inline-flex size-8 items-center justify-center rounded-md text-body tabular text-fg-primary outline-none transition-colors duration-fast select-none',
      'hover:bg-surface-control-hover focus-visible:ring-focus',
      'data-today:font-semibold data-today:text-accent',
      'data-selected:bg-action-primary data-selected:text-action-primary-fg data-selected:hover:bg-action-primary-hover',
      'data-outside-month:text-fg-disabled data-outside-month:pointer-events-none',
      'data-disabled:pointer-events-none data-disabled:text-fg-disabled data-unavailable:line-through data-unavailable:text-fg-disabled',
    ].join(' '),
  };
</script>

<script lang="ts">
  import { Calendar } from 'bits-ui';
  import ChevronLeft from '@lucide/svelte/icons/chevron-left';
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import type { DateValue } from '@internationalized/date';
  import { cn } from '../../utils/cn.js';
  import { useHeliony, useStrings } from '../../i18n/context.svelte.js';

  type Props = {
    value?: DateValue;
    placeholder?: DateValue;
    minValue?: DateValue;
    maxValue?: DateValue;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    disabled?: boolean;
    readonly?: boolean;
    isDateDisabled?: (date: DateValue) => boolean;
    isDateUnavailable?: (date: DateValue) => boolean;
    onchange?: (value: DateValue | undefined) => void;
    class?: string;
  };
  let { value = $bindable(), placeholder = $bindable(), minValue, maxValue, locale, weekStartsOn = 1, disabled = false, readonly = false, isDateDisabled, isDateUnavailable, onchange, class: className }: Props = $props();
  const cfg = useHeliony();
  const t = useStrings();
  const loc = $derived(locale ?? cfg.locale);
</script>

<Calendar.Root type="single" bind:value bind:placeholder {minValue} {maxValue} locale={loc} {weekStartsOn} {disabled} {readonly} {isDateDisabled} {isDateUnavailable} weekdayFormat="short" fixedWeeks onValueChange={(v) => onchange?.(v)} calendarLabel={t.date.pick}
  class={cn('inline-flex flex-col gap-3 p-3 text-fg-primary', className)}>
  {#snippet children({ months, weekdays })}
    <Calendar.Header class={calendarClasses.nav}>
      <Calendar.PrevButton class={calendarClasses.navButton} aria-label={t.date.prevMonth}><ChevronLeft aria-hidden="true" /></Calendar.PrevButton>
      <Calendar.Heading class={calendarClasses.heading} />
      <Calendar.NextButton class={calendarClasses.navButton} aria-label={t.date.nextMonth}><ChevronRight aria-hidden="true" /></Calendar.NextButton>
    </Calendar.Header>
    {#each months as month (month.value.toString())}
      <Calendar.Grid class={calendarClasses.grid}>
        <Calendar.GridHead>
          <Calendar.GridRow class="flex">
            {#each weekdays as day (day)}<Calendar.HeadCell class={calendarClasses.headCell}>{day.slice(0, 2)}</Calendar.HeadCell>{/each}
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody>
          {#each month.weeks as week (week[0]?.toString())}
            <Calendar.GridRow class="mt-1 flex w-full">
              {#each week as date (date.toString())}
                <Calendar.Cell {date} month={month.value} class={calendarClasses.cell}>
                  <Calendar.Day class={calendarClasses.day} />
                </Calendar.Cell>
              {/each}
            </Calendar.GridRow>
          {/each}
        </Calendar.GridBody>
      </Calendar.Grid>
    {/each}
  {/snippet}
</Calendar.Root>
