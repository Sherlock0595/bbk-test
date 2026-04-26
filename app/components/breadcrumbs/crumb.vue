<script setup lang="ts">
defineProps<{
  anchorId: string;
  label: string;
}>();

defineEmits<{
  (e: 'eat-crumb', anchorId: string): void;
}>();
</script>

<template>
  <a :href="`#${anchorId}`" @click="$emit('eat-crumb', anchorId)"> {{ label }} / </a>
</template>
