<script setup lang="ts">
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';
import { useBbkStore } from '@/stores/bbk-store';
import BbkTree from '~/components/tree/bbk-tree.vue';
import BbkDetails from '~/components/tree/bbk-details.vue';
import TagsList from '~/components/lists/tags-list.vue';

const bbkStore = useBbkStore();
const breadcrumbStore = useBreadcrumbStore();

await bbkStore.loadRootNodes();

const detailedNode = ref<BbkRootRecordType[number]>();
const formattedTags = computed(() => Array.from(bbkStore.getSelectedNodes));
const formatPushedBreadcrumbs = computed(() =>
  breadcrumbStore.getBreadcrumbs
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
              :highlightedNode="breadcrumbStore.getHighlightedNodeId"
              @load-children="bbkStore.loadNodeChildren"
              @expand-node="bbkStore.expandNode"
              @collapse-node="bbkStore.collapseNode"
              @check-node="bbkStore.toggleSelectedNode"
              @push-breadcrumb="breadcrumbStore.setBreadcrumbs"
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
          <bbk-details
            :node="detailedNode"
            :breadcrumbs="formatPushedBreadcrumbs"
            @select-breadcrumb="breadcrumbStore.setHighlightedNodeId"
          />
        </div>
      </transition>
    </div>

    <tags-list v-if="formattedTags.length" class="mt-6" :tags="formattedTags">
      <template #title> Выбранные узлы ({{ formattedTags.length }}) </template>
    </tags-list>
  </div>
</template>
