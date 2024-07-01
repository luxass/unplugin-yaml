<script setup lang="ts">
import { codeToHtml } from "shiki";
import PageLayout from "../layouts/PageLayout.vue";

import config from "../config.yaml";

const html = await codeToHtml(JSON.stringify(config, null, 2), {
  lang: "json",
  themes: {
    light: "min-light",
    dark: "nord",
  },
});
</script>

<template>
  <PageLayout>
    Hello!
  </PageLayout>
</template>
