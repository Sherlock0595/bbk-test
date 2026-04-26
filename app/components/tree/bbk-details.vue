<script setup lang="ts">
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';

defineProps<{
  node: BbkRootRecordType[number];
}>();
</script>

<template>
  <div>код: {{ node.code }}</div>
</template>
