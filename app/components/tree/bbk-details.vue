<script setup lang="ts">
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';
import type { BreadcrumbType } from '~/types';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.vue';

defineProps<{
  node: BbkRootRecordType[number];
  breadcrumbs: BreadcrumbType[];
}>();
</script>

<template>
  <div>
    <div>
      <div>путь до выбранного элемента</div>
      <breadcrumbs :breadcrumbs="breadcrumbs" />
    </div>
    <div>UUID: {{ node.id }}</div>
    <div>заголовок: {{ node.title }}</div>
    <div>код: {{ node.code }}</div>
    <div>дочерние: {{ node.hasChildren ? 'есть' : 'нет' }}</div>
  </div>
</template>
