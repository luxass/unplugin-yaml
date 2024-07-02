<script setup lang="ts">
import { RouterView } from "vue-router";
import PageLayout from "./layouts/PageLayout.vue";
</script>

<template>
  <PageLayout>
    <Suspense>
      <RouterView />
    </Suspense>
  </PageLayout>
</template>
