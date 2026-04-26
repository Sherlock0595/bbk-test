<script setup lang="ts">
import type { BreadcrumbType } from '~/types';
import Crumb from '~/components/breadcrumbs/crumb.vue';

defineProps<{
  breadcrumbs: BreadcrumbType[];
}>();
</script>

<template>
  <div class="flex gap-4">
    <crumb
      v-for="breadcrumb in breadcrumbs"
      :key="breadcrumb.anchorId"
      :anchor-id="breadcrumb.anchorId"
      :label="breadcrumb.label"
    />
  </div>
</template>
