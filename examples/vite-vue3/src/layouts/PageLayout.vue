<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <nav class="grid grid-cols-2 gap-2">
      <RouterLink href="/" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 h-10 px-4 py-2 bg-neutral-200 text-neutral-900 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80">
        Import as Module
      </RouterLink>
      <RouterLink href="/raw-import" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 h-10 px-4 py-2 bg-neutral-200 text-neutral-900 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80">
        Raw Import
      </RouterLink>
    </nav>
  </header>
  <main>
    <slot />
  </main>
</template>
