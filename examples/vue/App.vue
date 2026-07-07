<script setup>
import "olloweditor/styles.css";
import OllowEditor from "olloweditor";
import { onMounted } from "vue";

onMounted(() => {
  OllowEditor.init("#editor", {
    theme: "auto",
    persistTheme: true,
  });
});
</script>

<template>
  <textarea id="editor" name="body" data-nw-editor />
</template>
