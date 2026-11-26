<script lang="ts">
  import { Surface, Button, Badge, EmptyState, toast } from '@heliony/ui';
  import Server from '@lucide/svelte/icons/server';
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center justify-between gap-4">
    <div>
      <h1 class="text-title">Vue d’ensemble</h1>
      <p class="text-body text-fg-secondary">Aucune machine connectée pour le moment.</p>
    </div>
    <Badge tone="info" dot>Démo</Badge>
  </div>
  <Surface padding="none">
    <EmptyState icon={Server} title="Aucun serveur" description="Installez l’agent sur une machine pour commencer à collecter des données.">
      <Button variant="primary" onclick={() => toast.success('Bientôt', 'L’installation guidée arrive.')}>Ajouter une machine</Button>
    </EmptyState>
  </Surface>
</div>
