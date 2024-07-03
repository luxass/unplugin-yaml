<template>
  <header class="py-4">
    <nav class="grid grid-cols-2 gap-2">
      <NuxtLink
        to="/"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 h-10 px-4 py-2 bg-neutral-200 text-neutral-900 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80"
      >
        Import as Module
      </NuxtLink>
      <NuxtLink
        to="/raw-import"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 h-10 px-4 py-2 bg-neutral-200 text-neutral-900 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80"
      >
        Raw Import
      </NuxtLink>
    </nav>
  </header>
  <main>
    <Suspense>
      <NuxtPage />
    </Suspense>
  </main>
</template>

<style>
html {
  @apply antialiased touch-manipulation scroll-smooth text-base;
  text-rendering: optimizeLegibility;
}

* {
  @apply outline-white selection:bg-neutral-700 selection:text-white;
}

body {
  @apply text-neutral-900 bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-900 p-4 max-w-3xl md:mx-auto relative min-h-screen text-sm md:text-base flex flex-col;
}

pre.shiki {
  @apply py-2 px-4 overflow-auto rounded border border-neutral-200 dark:border-neutral-700;
}

pre > code {
  @apply rounded block text-sm whitespace-pre;
  font-family: Consolas, Monaco, "Andale Mono", monospace;
  word-break: normal;
  word-spacing: normal;
  tab-size: 4;
}

@media (prefers-color-scheme: dark) {
  .shiki,
  .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* Optional, if you also want font styles */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}
</style>
