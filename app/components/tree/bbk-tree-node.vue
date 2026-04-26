<script setup lang="ts">
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';

defineProps<{
  id: BbkRootRecordType[number]['id'];
  code: BbkRootRecordType[number]['code'];
  title: BbkRootRecordType[number]['title'];
  checked: boolean;
}>();

const emit = defineEmits<{
  (e: 'open-node' | 'select-node', id: BbkRootRecordType[number]['id']): void;
}>();
</script>

<template>
  <div class="bg-red-400 flex gap-4 mb-2 border border-black w-fit cursor-pointer" @click="emit('open-node', id)">
    <input type="checkbox" :checked="checked" @click.stop @change.stop="emit('select-node', id)" />
    <div>{{ code }}</div>
    <div>-</div>
    <div>{{ title }}</div>
  </div>
</template>
