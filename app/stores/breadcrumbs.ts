import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';

export const useBreadcrumbStore = defineStore('breadcrumbs', () => {
  const breadcrumbs = ref<BbkRootRecordType[number][]>([]);
  const highlightedNodeId = ref<BbkRootRecordType[number]['id']>();

  const getBreadcrumbs = computed(() => breadcrumbs.value);
  const getHighlightedNodeId = computed(() => highlightedNodeId.value);

  const setBreadcrumbs = (crumbs: BbkRootRecordType[number][]) => {
    breadcrumbs.value = crumbs;
  };

  const setHighlightedNodeId = (nodeId: BbkRootRecordType[number]['id']) => {
    highlightedNodeId.value = nodeId;
  };

  return {
    setBreadcrumbs,
    setHighlightedNodeId,

    getBreadcrumbs,
    getHighlightedNodeId,
  };
});
