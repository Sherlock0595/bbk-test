import type { BbkRootRecordType } from '@api/bbk-service/requests/bbk-root-validator';
import type { BbkChildrenRecordMapType, BbkRecordMapType } from '~/types';
import { useBbkClient } from '@api/bbk-service/client';
import { parse, stringify } from 'zipson';

export const useBbkStore = defineStore(
  'bbk-store',
  () => {
    const bbkClient = useBbkClient();

    const nodes = ref<BbkRecordMapType>(new Map());
    const nodeChildren = ref<BbkChildrenRecordMapType>(new Map());
    const expandedNodes = ref<Set<string>>(new Set());
    const selectedNodes = ref<Set<string>>(new Set());

    const getNodes = computed(() => nodes.value);
    const getNodeChildren = computed(() => nodeChildren.value);
    const getExpandedNodes = computed(() => expandedNodes.value);
    const getSelectedNodes = computed(() => selectedNodes.value);

    const expandNode = (id: BbkRootRecordType[number]['id']) => {
      expandedNodes.value.add(id);
    };

    const collapseNode = (id: BbkRootRecordType[number]['id']) => {
      expandedNodes.value.delete(id);
    };

    const toggleSelectedNode = (id: BbkRootRecordType[number]['id']) => {
      if (selectedNodes.value.has(id)) {
        selectedNodes.value.delete(id);
      } else {
        selectedNodes.value.add(id);
      }
    };

    const loadRootNodes = async () => {
      const response = await bbkClient.getRoot();

      if (!response.data.value?.success) {
        console.error(response);
        return;
      }

      response.data.value.data?.forEach((node) => nodes.value.set(node.id, node));
    };

    const loadNodeChildren = async (id: BbkRootRecordType[number]['id']) => {
      if (nodeChildren.value.has(id)) return;

      const response = await bbkClient.getChildren(id);

      if (!response.success) {
        console.error(response);
        return;
      }

      const children: BbkRecordMapType = new Map();
      response.data.forEach((node) => children.set(node.id, node));

      nodeChildren.value.set(id, children);
    };

    return {
      getNodes,
      getNodeChildren,
      getExpandedNodes,
      getSelectedNodes,

      loadRootNodes,
      loadNodeChildren,
      toggleSelectedNode,
      expandNode,
      collapseNode,
    };
  },
  {
    persist: {
      serializer: {
        deserialize: parse,
        serialize: stringify,
      },
    },
  },
);
