# Ollow Editor

Reusable rich-text editor for JavaScript and TypeScript projects, including React, MERN, Node.js, Vue, Next.js, and NestJS.

## Structure

```text
olloweditor/
├── src/
│   ├── core/
│   │   └── ollow-editor.js
│   ├── react/
│   │   ├── OllowEditor.jsx
│   │   └── index.js
│   ├── styles/
│   │   └── ollow-editor.css
│   ├── types/
│   │   ├── index.d.ts
│   │   └── react.d.ts
│   └── index.js
├── examples/
│   ├── vanilla-js/
│   ├── vanilla-ts/
│   ├── react-js/
│   ├── react-ts/
│   ├── nextjs/
│   ├── vue/
│   ├── node-express-upload/
│   └── nestjs-upload/
├── dist/
├── README.md
├── LICENSE
├── package.json
├── vite.config.js
├── tsconfig.json
└── .npmignore
```

## Source layout

- `src/core/ollow-editor.js`: framework-independent editor core
- `src/react/`: React wrapper only
- `src/styles/ollow-editor.css`: shared editor styles
- `src/types/`: TypeScript declarations for package consumers
- `src/index.js`: package exports

## Install

```bash
npm install olloweditor
```

## Vanilla JavaScript usage

```html
<link rel="stylesheet" href="olloweditor/styles.css" />

<textarea id="editor" name="content" data-nw-editor></textarea>

<script type="module">
  import OllowEditor from "olloweditor";

  OllowEditor.init("#editor", {
    theme: "auto",
    persistTheme: true
  });
</script>
```

## Vanilla TypeScript usage

```ts
import OllowEditor from "olloweditor";
import "olloweditor/styles.css";

const editor = OllowEditor.init("#editor", {
  theme: "auto",
  persistTheme: true
});

editor?.on("change", () => {
  editor.sync();
});
```

## React JavaScript usage

```jsx
import "olloweditor/styles.css";
import { OllowEditor } from "olloweditor/react";

export default function ArticleForm() {
  return (
    <OllowEditor
      options={{ theme: "auto", persistTheme: true }}
      textareaProps={{ name: "body" }}
    />
  );
}
```

## React TypeScript usage

```tsx
import "olloweditor/styles.css";
import { OllowEditor } from "olloweditor/react";

export default function EditorForm() {
  return (
    <OllowEditor
      options={{ theme: "auto", persistTheme: true }}
      textareaProps={{ name: "body" }}
    />
  );
}
```

## Local demo

Open [examples/vanilla-js/index.html](/home/jaki/Dev/olloweditor/examples/vanilla-js/index.html) directly in a browser, or serve the repo root with a static server.

## Publishing notes

- `examples/` and `website/` are excluded from npm publishing.
- Package exports are defined in `src/index.js`.
- TypeScript declarations are published from `src/types/`.
- Shared CSS is published as `olloweditor/styles.css`.
