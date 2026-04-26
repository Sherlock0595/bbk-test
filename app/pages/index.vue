<script setup lang="ts">
import BbkTree from '~/components/tree/bbk-tree.vue';
import { useBbkStore } from '@/stores/bbk-store';

const bbkStore = useBbkStore();

await bbkStore.loadRootNodes();
</script>

<template>
  <div>
    <bbk-tree
      :root="bbkStore.getNodes"
      :children="bbkStore.getNodeChildren"
      :expanded-nodes="bbkStore.getExpandedNodes"
      :selected-nodes="bbkStore.getSelectedNodes"
      @load-children="(id) => bbkStore.loadNodeChildren(id)"
      @expand-node="(id) => bbkStore.expandNode(id)"
      @collapse-node="(id) => bbkStore.collapseNode(id)"
      @select-node="(id) => bbkStore.toggleSelectedNode(id)"
    />

    <div class="mt-12">
      {{ bbkStore.getSelectedNodes }}
    </div>
  </div>
</template>
