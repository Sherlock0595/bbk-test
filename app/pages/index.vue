<script setup lang="ts">
import { useBbkStore } from '@/stores/bbk-store';

const bbkStore = useBbkStore();

await bbkStore.loadRootNodes();

async function loadChildren(id: string) {
  await bbkStore.loadNodeChildren(id);
}
</script>

<template>
  <div>
    <div v-for="[id, node] in bbkStore.getNodes" :key="id">
      <div @click="loadChildren(id)">{{ node }}</div>
      <div>
        {{ bbkStore.getNodeChildren.get(id) }}
      </div>
    </div>
  </div>
</template>
