import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';
import { useBbkClient } from '@api/bbk-service/client';
import { parse, stringify } from 'zipson';

export const useBbkStore = defineStore(
  'bbk-store',
  () => {
    const bbkClient = useBbkClient();

    const nodes = ref<Map<BbkRootRecordType[number]['id'], BbkRootRecordType[number]>>(new Map());
    const nodeChildren = ref<Map<BbkRootRecordType[number]['id'], typeof nodes.value>>(new Map());

    const getNodes = computed(() => nodes.value);
    const getNodeChildren = computed(() => nodeChildren.value);

    const loadRootNodes = async () => {
      const response = await bbkClient.getRoot();

      if (!response.data.value?.success) {
        console.error(response);
        return;
      }

      response.data.value.data?.forEach((node) => nodes.value.set(node.id, node));
    };

    const loadNodeChildren = async (id: BbkRootRecordType[number]['id']) => {
      const response = await bbkClient.getChildren(id);

      if (!response.success) {
        console.error(response);
        return;
      }

      // FIXME: отрефакторить сделать в одну строчку
      const children = new Map();
      response.data.forEach((node) => children.set(id, node));

      nodeChildren.value.set(id, children);
    };

    return {
      getNodes,
      getNodeChildren,
      loadRootNodes,
      loadNodeChildren,
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
