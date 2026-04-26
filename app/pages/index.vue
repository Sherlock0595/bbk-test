<script setup lang="ts">
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root';
import { useBbkClient } from '@api/bbk-service/client';

const bbkClient = useBbkClient();

const data = ref<BbkRootRecordType>([]);

async function click() {
  const response = await bbkClient.getRoot();

  if (response.success) {
    data.value = response.output;
  }
}

const res0 = useFetch('/api/v1/bbk/root', { method: 'GET', lazy: true });
</script>

<template>
  <div>
    <code>{{ res0.data }}</code>
    <div @click="click">loading: {{ data }}</div>
  </div>
</template>
