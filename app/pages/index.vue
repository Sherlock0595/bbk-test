<script setup lang="ts">
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';
import BbkTree from '~/components/tree/bbk-tree.vue';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.vue';
import { useBbkStore } from '@/stores/bbk-store';
import type { BreadcrumbType } from '~/types';

const bbkStore = useBbkStore();

await bbkStore.loadRootNodes();

const pushedBreadcrumbs = ref<BbkRootRecordType[number][]>([]);
const getPushedBreadcrumbs = computed<BreadcrumbType[]>(() =>
  pushedBreadcrumbs.value
    .map((node) => ({
      anchorId: node.id,
      label: node.title,
    }))
    .reverse(),
);
</script>

<template>
  <div>
    <div>
      <breadcrumbs :breadcrumbs="getPushedBreadcrumbs" />
    </div>
    <bbk-tree
      :root="bbkStore.getNodes"
      :children="bbkStore.getNodeChildren"
      :expanded-nodes="bbkStore.getExpandedNodes"
      :selected-nodes="bbkStore.getSelectedNodes"
      @load-children="(id) => bbkStore.loadNodeChildren(id)"
      @expand-node="(id) => bbkStore.expandNode(id)"
      @collapse-node="(id) => bbkStore.collapseNode(id)"
      @check-node="(id) => bbkStore.toggleSelectedNode(id)"
      @push-breadcrumb="(breadcrumbs) => (pushedBreadcrumbs = breadcrumbs)"
    />

    <div class="mt-12">
      {{ bbkStore.getSelectedNodes }}
    </div>
  </div>
</template>
