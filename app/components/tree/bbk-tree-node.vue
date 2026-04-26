<script setup lang="ts">
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';

defineProps<{
  node: BbkRootRecordType[number];
  checked: boolean;
}>();

const emit = defineEmits<{
  (e: 'open-node' | 'check-node', node: BbkRootRecordType[number]): void;
}>();
</script>

<template>
  <div
    :id="node.id"
    class="bg-red-400 flex gap-4 mb-2 border border-black w-fit cursor-pointer"
    @click="emit('open-node', node)"
  >
    <input type="checkbox" :checked="checked" @click.stop @change.stop="emit('check-node', node)" />
    <div>{{ node.code }}</div>
    <div>-</div>
    <div>{{ node.title }}</div>
  </div>
</template>
