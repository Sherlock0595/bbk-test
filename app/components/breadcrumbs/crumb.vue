<script setup lang="ts">
defineProps<{
  anchorId: string;
  label: string;
  isLast: boolean;
}>();

defineEmits<{
  (e: 'eat-crumb' | 'select', anchorId: string): void;
}>();
</script>

<template>
  <div class="flex items-center gap-1">
    <a
      :href="`#${anchorId}`"
      @click.prevent="$emit('select', anchorId)"
      class="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium truncate hover:font-bold"
    >
      {{ label }}
    </a>
    <span v-if="!isLast" class="text-slate-400">/</span>
  </div>
</template>
