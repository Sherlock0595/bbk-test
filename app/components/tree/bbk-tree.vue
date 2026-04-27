<script setup lang="ts">
import type { BbkChildrenRecordMapType, BbkRecordMapType } from '~/types/types';
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';
import BbkTreeNode from '~/components/tree/bbk-tree-node.vue';

const props = withDefaults(
  defineProps<{
    root: BbkRecordMapType;
    children: BbkChildrenRecordMapType;
    level?: number;
    expandedNodes: Set<BbkRootRecordType[number]['id']>;
    selectedNodes: Set<BbkRootRecordType[number]['id']>;
    loadingNodes: Set<BbkRootRecordType[number]['id']>;
    highlightedNode?: BbkRootRecordType[number]['id'];
  }>(),
  {
    level: 0,
  },
);

const emit = defineEmits<{
  (e: 'load-children' | 'expand-node' | 'collapse-node' | 'check-node', id: BbkRootRecordType[number]['id']): void;
  (e: 'push-breadcrumb', breadcrumbs: BbkRootRecordType[number][]): void;
  (e: 'show-detail', node: BbkRootRecordType[number]): void;
}>();

const marginLeft = `${props.level * 30}px`;

const emitExpandNode = (node: BbkRootRecordType[number]) => {
  emit('push-breadcrumb', [node]);

  if (props.expandedNodes.has(node.id)) {
    emit('collapse-node', node.id);
  } else {
    emit('expand-node', node.id);
    emit('show-detail', node);
  }
};

const emitOpenNode = (node: BbkRootRecordType[number]) => {
  emit('load-children', node.id);
  emit('push-breadcrumb', [node]);

  emitExpandNode(node);
};
</script>

<template>
  <div :style="{ marginLeft }">
    <div v-for="[id, node] of root" :key="id">
      <bbk-tree-node
        :node="node"
        :checked="selectedNodes.has(node.id)"
        :is-highlighted="highlightedNode === node.id"
        @open-node="(node) => (node.hasChildren ? emitOpenNode(node) : emitExpandNode(node))"
        @check-node="(node) => emit('check-node', node.id)"
      />

      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-2"
      >
        <template v-if="expandedNodes.has(node.id)">
          <div v-if="loadingNodes.has(node.id)" class="text-sm text-slate-500 italic py-2 px-3">
            ⏳ Загрузка дочерних элементов...
          </div>

          <div v-else-if="(children.get(node.id)?.size ?? 0) == 0" class="text-sm text-slate-400 py-2 px-3">
            ✓ Нет дочерних элементов
          </div>

          <bbk-tree
            v-else
            :root="children.get(node.id) ?? new Map()"
            :children="children"
            :level="level + 1"
            :expanded-nodes="expandedNodes"
            :selected-nodes="selectedNodes"
            :loading-nodes="loadingNodes"
            :highlightedNode="highlightedNode"
            @load-children="(id) => emit('load-children', id)"
            @expand-node="(id) => emit('expand-node', id)"
            @collapse-node="(id) => emit('collapse-node', id)"
            @check-node="(id) => emit('check-node', id)"
            @show-detail="(node) => emit('show-detail', node)"
            @push-breadcrumb="
              (breadcrumbs) => {
                breadcrumbs.push(node);
                emit('push-breadcrumb', breadcrumbs);
              }
            "
          />
        </template>
      </transition>
    </div>
  </div>
</template>
