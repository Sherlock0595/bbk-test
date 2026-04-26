<script setup lang="ts">
import type { BbkChildrenRecordMapType, BbkRecordMapType } from '~/types';
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';
import BbkTreeNode from '~/components/tree/bbk-tree-node.vue';
import BbkDetails from '~/components/tree/bbk-details.vue';

const props = withDefaults(
  defineProps<{
    root: BbkRecordMapType;
    children: BbkChildrenRecordMapType;
    level?: number;
    expandedNodes: Set<BbkRootRecordType[number]['id']>;
    selectedNodes: Set<BbkRootRecordType[number]['id']>;
  }>(),
  {
    level: 0,
  },
);

const emit = defineEmits<{
  (e: 'load-children' | 'expand-node' | 'collapse-node' | 'check-node', id: BbkRootRecordType[number]['id']): void;
  (e: 'push-breadcrumb', breadcrumbs: BbkRootRecordType[number][]): void;
}>();

const marginLeft = `${props.level * 30}px`;

const emitExpandNode = (node: BbkRootRecordType[number]) => {
  emit('push-breadcrumb', [node]);

  if (props.expandedNodes.has(node.id)) {
    emit('collapse-node', node.id);
  } else {
    emit('expand-node', node.id);
  }
};

const emitOpenNode = (node: BbkRootRecordType[number]) => {
  emit('load-children', node.id);
  emit('push-breadcrumb', [node]);

  emitExpandNode(node);
};
</script>

<template>
  <div>
    <div v-for="[id, node] of root" :key="id">
      <bbk-tree-node
        :style="{ marginLeft }"
        :node="node"
        :checked="selectedNodes.has(node.id)"
        @open-node="(node) => (node.hasChildren ? emitOpenNode(node) : emitExpandNode(node))"
        @check-node="(node) => emit('check-node', node.id)"
      />

      <template v-if="expandedNodes.has(node.id)">
        <bbk-tree
          v-if="node.hasChildren"
          :root="children.get(node.id) ?? new Map()"
          :children="children"
          :level="level + 1"
          :expanded-nodes="expandedNodes"
          :selected-nodes="selectedNodes"
          @load-children="(id) => emit('load-children', id)"
          @expand-node="(id) => emit('expand-node', id)"
          @collapse-node="(id) => emit('collapse-node', id)"
          @check-node="(id) => emit('check-node', id)"
          @push-breadcrumb="
            (breadcrumbs) => {
              breadcrumbs.push(node);
              emit('push-breadcrumb', breadcrumbs);
            }
          "
        />

        <bbk-details v-else :style="{ marginLeft }" :node="node" />
      </template>
    </div>
  </div>
</template>
