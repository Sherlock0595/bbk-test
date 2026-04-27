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
    <div class="flex gap-6">
      <div class="flex-1 min-w-0">
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div class="px-4 py-3 border-b border-slate-200 bg-slate-50">
            <h2 class="text-sm font-semibold text-slate-900">Справочник ББК</h2>
          </div>
          <div class="overflow-y-auto max-h-[calc(100vh-200px)]">
            <bbk-tree
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
          </div>
        </div>
      </div>

      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0 translate-x-4"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="transform opacity-0 translate-x-4"
      >
        <div v-if="detailedNode" class="w-96 flex-shrink-0">
          <bbk-details :node="detailedNode" :breadcrumbs="formatPushedBreadcrumbs" />
        </div>
      </transition>
    </div>

    <div v-if="bbkStore.getSelectedNodes.size > 0" class="mt-6">
      <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <h3 class="text-sm font-semibold text-slate-900 mb-3">
          Выбранные элементы ({{ bbkStore.getSelectedNodes.size }})
        </h3>
        <div class="flex flex-wrap align-center gap-2 max-h-40 overflow-y-auto">
          <div
            v-for="nodeId of Array.from(bbkStore.getSelectedNodes)"
            :key="nodeId"
            class="text-sm text-slate-700 px-1 py-1 bg-blue-50 rounded border border-blue-200"
          >
            {{ nodeId }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
