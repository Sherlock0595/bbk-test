<script setup lang="ts">
import type { BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';
import type { BreadcrumbType } from '~/types/types';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs.vue';

defineProps<{
  node: BbkRootRecordType[number];
  breadcrumbs: BreadcrumbType[];
}>();

const emit = defineEmits<{
  (e: 'select-breadcrumb', nodeId: string): void;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden sticky top-24">
    <div class="px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <h3 class="text-sm font-semibold text-slate-900">Деталь элемента</h3>
    </div>

    <div class="p-4 space-y-4">
      <div>
        <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Путь</p>
        <div class="bg-slate-50 rounded px-3 py-2">
          <breadcrumbs :breadcrumbs="breadcrumbs" @select-breadcrumb="(nodeId) => emit('select-breadcrumb', nodeId)" />
        </div>
      </div>

      <div class="grid gap-3">
        <div>
          <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Код</p>
          <p class="text-sm font-mono font-bold text-blue-700 bg-blue-50 px-3 py-2 rounded break-all">
            {{ node.code }}
          </p>
        </div>

        <div>
          <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Заголовок</p>
          <p class="text-sm text-slate-900 px-3 py-2 bg-slate-50 rounded break-words">
            {{ node.title }}
          </p>
        </div>

        <div>
          <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">UUID</p>
          <p class="text-xs font-mono text-slate-600 px-3 py-2 bg-slate-50 rounded break-all">
            {{ node.id }}
          </p>
        </div>

        <div>
          <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Дочерние элементы</p>
          <div class="px-3 py-2 rounded" :class="node.hasChildren ? 'bg-green-50' : 'bg-slate-50'">
            <span
              class="inline-flex items-center gap-1 text-sm font-medium"
              :class="node.hasChildren ? 'text-green-700' : 'text-slate-600'"
            >
              <span v-if="node.hasChildren" class="text-lg">✓</span>
              <span v-else class="text-lg">-</span>
              {{ node.hasChildren ? 'Есть' : 'Нет' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
