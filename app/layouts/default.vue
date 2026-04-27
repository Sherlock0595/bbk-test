<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
    <header class="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between gap-4">
          <h1 class="text-2xl font-bold text-slate-900">ББК Каталог</h1>
          <div class="text-sm text-slate-600">Поиск...</div>
        </div>
      </div>
    </header>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <slot />
    </section>
  </div>
</template>
