<script setup lang="ts">
import type { BreadcrumbType } from '~/types';
import Crumb from '~/components/breadcrumbs/crumb.vue';

defineProps<{
  breadcrumbs: BreadcrumbType[];
}>();

const emit = defineEmits<{
  (e: 'select-breadcrumb', nodeId: string): void;
}>();
</script>

<template>
  <div class="flex items-center flex-wrap gap-1">
    <crumb
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="breadcrumb.anchorId"
      :anchor-id="breadcrumb.anchorId"
      :label="breadcrumb.label"
      :is-last="index === breadcrumbs.length - 1"
      @select="(nodeId) => emit('select-breadcrumb', nodeId)"
    />
  </div>
</template>
