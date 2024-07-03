<script setup lang="ts">
import { codeToHtml } from "shiki";

import config from "../config.yaml?raw";

const html = await codeToHtml(config, {
  lang: "yaml",
  themes: {
    light: "github-light",
    dark: "github-dark",
  },
});
</script>

<template>
  <div v-html="html" />
</template>
