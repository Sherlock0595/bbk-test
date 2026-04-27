<script setup lang="ts">
defineProps<{
  tags: string[];
}>();
</script>

<template>
  <div>
    <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <h3 class="text-sm font-semibold text-slate-900 mb-3">
        <slot name="title" />
      </h3>
      <div class="flex flex-wrap align-center gap-2 max-h-40 overflow-y-auto">
        <div
          v-for="(tag, idx) of tags"
          :key="idx"
          class="text-sm text-slate-700 px-1 py-1 bg-blue-50 rounded border border-blue-200"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>
