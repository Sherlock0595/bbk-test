<script setup lang="ts">
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';

defineProps<{
  node: BbkRootRecordType[number];
  checked: boolean;
  isHighlighted: boolean;
}>();

const emit = defineEmits<{
  (e: 'open-node' | 'check-node', node: BbkRootRecordType[number]): void;
}>();
</script>

<template>
  <div
    :id="node.id"
    class="flex items-center gap-3 px-3 py-2 mb-1 rounded-md cursor-pointer transition-all hover:bg-slate-100 active:bg-slate-200 group"
    :class="{
      'bg-yellow-100 border-2 border-yellow-400 hover:bg-yellow-100': isHighlighted,
    }"
    @click="emit('open-node', node)"
  >
    <input
      type="checkbox"
      :checked="checked"
      @click.stop
      @change.stop="emit('check-node', node)"
      class="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer accent-blue-600"
    />
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded">{{ node.code }}</span>
        <span class="text-sm text-slate-700 truncate font-medium">{{ node.title }}</span>
      </div>
    </div>
    <div v-if="node.hasChildren" class="flex-shrink-0 text-xs text-slate-400 group-hover:text-slate-600">→</div>
  </div>
</template>
