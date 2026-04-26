<script setup lang="ts">
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';
import type { BreadcrumbType } from '~/types';
import BbkTree from '~/components/tree/bbk-tree.vue';
import BbkDetails from '~/components/tree/bbk-details.vue';
import { useBbkStore } from '@/stores/bbk-store';

const bbkStore = useBbkStore();

await bbkStore.loadRootNodes();

const detailedNode = ref<BbkRootRecordType[number]>();
const pushedBreadcrumbs = ref<BbkRootRecordType[number][]>([]);
const formatPushedBreadcrumbs = computed<BreadcrumbType[]>(() =>
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
    <div class="flex flex-wrap">
      <bbk-tree
        class="flex-auto overflow-x-auto border"
        :root="bbkStore.getNodes"
        :children="bbkStore.getNodeChildren"
        :expanded-nodes="bbkStore.getExpandedNodes"
        :selected-nodes="bbkStore.getSelectedNodes"
        :loading-nodes="bbkStore.getLoadingNodes"
        @load-children="(id) => bbkStore.loadNodeChildren(id)"
        @expand-node="(id) => bbkStore.expandNode(id)"
        @collapse-node="(id) => bbkStore.collapseNode(id)"
        @check-node="(id) => bbkStore.toggleSelectedNode(id)"
        @push-breadcrumb="(breadcrumbs) => (pushedBreadcrumbs = breadcrumbs)"
        @show-detail="(node) => (detailedNode = node)"
      />

      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <bbk-details
          class="w-1/2 border sticky top-0 self-start"
          v-if="detailedNode"
          :node="detailedNode"
          :breadcrumbs="formatPushedBreadcrumbs"
        />
      </transition>
    </div>

    <div class="mt-12">
      {{ bbkStore.getSelectedNodes }}
    </div>
  </div>
</template>
