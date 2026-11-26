<script lang="ts">
  import { components, groups } from '../../../catalog/catalog.js';
  import { Segmented, Switch, Input, Slider, Badge, Divider, Surface } from '../../../src/lib/index.js';
  import Demos from '../Demos.svelte';

  type Props = { name: string; width: string };
  let { name, width }: Props = $props();
  const c = $derived(components.find((x) => x.name === name)!);
  const repriseLabel = { adapted: 'Repris de shadcn-svelte, habillé', recoded: 'Recodé pour Heliony', original: 'Composant maison' } as const;
  const repriseTone = { adapted: 'neutral', recoded: 'accent', original: 'intelligence' } as const;

  function init(n: string) {
    const comp = components.find((x) => x.name === n)!;
    const v: Record<string, unknown> = {};
    for (const ctl of comp.controls ?? []) {
      const prop = comp.props.find((q) => q.name === ctl.prop);
      const def = prop?.default?.replace(/'/g, '');
      v[ctl.prop] = ctl.options ? (def && ctl.options.includes(def) ? def : ctl.options[0]) : ctl.bool ? def === 'true' : ctl.number ? Number(def) || Math.round((ctl.number[0] + ctl.number[1]) / 2) : '';
    }
    return v;
  }
  // svelte-ignore state_referenced_locally
  let values = $state<Record<string, any>>(init(name));
</script>

<article class="flex flex-col gap-8">
  <header class="flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-caption uppercase tracking-wider text-fg-tertiary">{groups.find((g) => g.id === c.group)?.label}</span>
      <Badge size="sm" tone={repriseTone[c.reprise]}>{repriseLabel[c.reprise]}</Badge>
    </div>
    <h1 class="text-title">{c.name}</h1>
    <p class="max-w-2xl text-lead text-fg-secondary">{c.summary}</p>
  </header>

  {#if c.controls?.length}
    <div class="flex flex-wrap items-end gap-x-6 gap-y-4">
      {#each c.controls as ctl (ctl.prop)}
        {#if ctl.options}
          <div class="flex flex-col gap-1.5"><span class="text-caption text-fg-tertiary">{ctl.prop}</span><Segmented size="sm" bind:value={values[ctl.prop]} options={ctl.options.map((o) => ({ value: o, label: o }))} /></div>
        {:else if ctl.bool}
          <Switch size="sm" bind:checked={values[ctl.prop]} label={ctl.prop} />
        {:else if ctl.number}
          <div class="w-48"><Slider label={ctl.prop} min={ctl.number[0]} max={ctl.number[1]} bind:value={values[ctl.prop]} /></div>
        {:else}
          <div class="flex w-48 flex-col gap-1.5"><span class="text-caption text-fg-tertiary">{ctl.prop}</span><Input size="sm" bind:value={values[ctl.prop]} placeholder="—" /></div>
        {/if}
      {/each}
    </div>
  {/if}

  <div class="grid gap-4 lg:grid-cols-2">
    {#each ['dark', 'light'] as theme (theme)}
      <div class={[theme, 'flex min-w-0 flex-col gap-2']}>
        <span class="text-caption text-fg-tertiary">{theme === 'dark' ? 'Sombre' : 'Clair'}</span>
        <div class="overflow-hidden rounded-xl border border-line-subtle bg-surface-base text-fg-primary">
          <div class="mx-auto min-h-48 p-6 transition-[max-width] duration-base ease-standard" style={width === 'full' ? undefined : `max-width:${width}px`}>
            <Demos name={c.name} p={values} />
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if c.use?.length || c.avoid?.length}
    <div class="grid gap-4 md:grid-cols-2">
      {#if c.use?.length}<Surface padding="md"><Badge tone="success">Utiliser</Badge><ul class="mt-3 flex flex-col gap-2 text-body text-fg-secondary">{#each c.use as u, i (i)}<li>{u}</li>{/each}</ul></Surface>{/if}
      {#if c.avoid?.length}<Surface padding="md"><Badge tone="danger">Éviter</Badge><ul class="mt-3 flex flex-col gap-2 text-body text-fg-secondary">{#each c.avoid as u, i (i)}<li>{u}</li>{/each}</ul></Surface>{/if}
    </div>
  {/if}

  <Divider label="Propriétés" />
  <div class="overflow-x-auto rounded-lg border border-line-subtle">
    <table class="w-full border-collapse text-body">
      <thead class="bg-surface-sunken text-label text-fg-tertiary"><tr><th class="px-3 py-2 text-start font-medium">Prop</th><th class="px-3 py-2 text-start font-medium">Type</th><th class="px-3 py-2 text-start font-medium">Défaut</th><th class="px-3 py-2 text-start font-medium">Description</th></tr></thead>
      <tbody class="divide-y divide-line-subtle">
        {#each c.props as pr (pr.name)}
          <tr class="align-top"><td class="px-3 py-2 font-mono text-code text-fg-primary">{pr.name}</td><td class="px-3 py-2 font-mono text-code text-fg-tertiary">{pr.type}</td><td class="px-3 py-2 text-fg-secondary">{pr.default}</td><td class="px-3 py-2 text-fg-secondary">{pr.desc}</td></tr>
        {/each}
      </tbody>
    </table>
  </div>

  <Divider label="Exemple" />
  <pre class="overflow-x-auto rounded-lg border border-line-subtle bg-surface-sunken p-4 font-mono text-code text-fg-primary"><code>{`import { ${c.name === 'Toast' ? 'Toaster, toast' : c.name} } from '@heliony/ui';\n\n${c.example}`}</code></pre>
</article>
