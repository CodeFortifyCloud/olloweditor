import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "OllowEditor",
      fileName: "olloweditor",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["react"],
      output: {
        assetFileNames: "assets/[name][extname]"
      }
    }
  }
});
