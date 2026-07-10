# OllowEditor

[![Python CI](https://github.com/jakiiii/olloweditor/actions/workflows/python-ci.yml/badge.svg)](https://github.com/jakiiii/olloweditor/actions/workflows/python-ci.yml)

A lightweight, framework-friendly rich text editor for modern web applications.

OllowEditor is a browser-based HTML editor built around a normal `<textarea>`. It renders a newsroom-style editing interface, keeps the original textarea synchronized with sanitized HTML, and works well in server-rendered forms, JavaScript applications, and React interfaces.

The repository ships three integration surfaces:

- a browser-ready bundle for direct `<script>` usage
- an npm package with ES module, CommonJS, React, and TypeScript support
- a Python package in `python/` with official integrations for Django, Django REST Framework, Flask, and FastAPI

## Preview

![OllowEditor editor interface preview](https://raw.githubusercontent.com/jakiiii/olloweditor/main/olloweditor.jpg)

## Why OllowEditor

- Textarea-first integration for normal form submission
- Browser bundle and npm package from the same runtime
- Official React wrapper and TypeScript declarations
- Responsive desktop, tablet, and mobile editing UI
- Built-in import/export tools for HTML, Markdown, PDF, and DOCX workflows
- Configurable upload adapter for images, galleries, and attachments
- Plugin hooks for toolbar buttons, commands, shortcuts, and sanitizer extensions
- Optional Python framework integrations packaged in this repository

## Installation

### npm

```bash
npm install @codefortify/olloweditor
```

### Yarn

```bash
yarn add @codefortify/olloweditor
```

### pnpm

```bash
pnpm add @codefortify/olloweditor
```

### Browser bundle

The repository build produces:

- `dist/olloweditor.browser.js`
- `dist/olloweditor.css`

Build them locally with:

```bash
npm install
npm run build
```

### Python

This repository includes a Python package under [`python/`](https://github.com/jakiiii/olloweditor/tree/main/python) with Django, DRF, Flask, and FastAPI integrations. The package metadata is prepared for PyPI as `olloweditor`, but publication is a separate step.

For local development from this checkout:

```bash
cd python
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e ".[all]"
```

See the dedicated Python guide: [python/README.md](https://github.com/jakiiii/olloweditor/tree/main/python/README.md).

## Quick start

The preferred browser-bundle API is `window.OllowEditor.create(element, options)`.

```html
<link rel="stylesheet" href="./dist/olloweditor.css">

<textarea id="editor" name="content"></textarea>

<script src="./dist/olloweditor.browser.js"></script>
<script>
  window.OllowEditor.create(
    document.getElementById("editor"),
    {
      theme: "auto",
      persistTheme: true
    }
  );
</script>
```

The textarea remains the source of truth for submission. Calling `sync()` or submitting a normal form writes the current editor HTML back into the textarea value.

## ES module usage

```js
import { createOllowEditor } from "@codefortify/olloweditor";
import "@codefortify/olloweditor/style.css";

const editor = createOllowEditor(document.getElementById("editor"), {
  placeholder: "Start writing...",
  onChange(html) {
    console.log(html);
  }
});
```

`createOllowEditor()` accepts either:

- an existing `<textarea>`
- another `HTMLElement`, in which case the wrapper creates and manages an internal textarea

## React usage

The React wrapper is published from `@codefortify/olloweditor/react`.

```jsx
"use client";

import { useState } from "react";
import { OllowEditor } from "@codefortify/olloweditor/react";
import "@codefortify/olloweditor/style.css";

export default function ArticleEditor() {
  const [value, setValue] = useState("<p>Hello</p>");

  return (
    <OllowEditor
      value={value}
      onChange={setValue}
      placeholder="Start writing..."
    />
  );
}
```

The React component is client-side code. In Next.js, use it from a client component.

## Python integrations

The Python package does not reimplement the editor. It packages:

- `olloweditor.browser.js`
- `olloweditor.css`
- `olloweditor-init.js`

Official integrations in `python/`:

- Django:
  `OllowEditorField` and `OllowEditorWidget`
- Django REST Framework:
  `OllowEditorHTMLField`
- Flask:
  `OllowEditor(app)` / `init_app`
- FastAPI:
  `mount_olloweditor()` and template helpers

Framework docs:

- [Python package overview](https://github.com/jakiiii/olloweditor/tree/main/python/README.md)
- [Django](https://github.com/jakiiii/olloweditor/tree/main/python/docs/django.md)
- [DRF](https://github.com/jakiiii/olloweditor/tree/main/python/docs/drf.md)
- [Flask](https://github.com/jakiiii/olloweditor/tree/main/python/docs/flask.md)
- [FastAPI](https://github.com/jakiiii/olloweditor/tree/main/python/docs/fastapi.md)

## Core features

### Writing and formatting

- paragraphs and headings
- bold, italic, underline, strikethrough
- subscript and superscript
- font family and font size controls
- text color and highlight color
- reusable style presets
- alignment, blockquotes, and horizontal rules
- links, unlink, and bookmarks

### Rich content

- images from local files or URLs
- galleries
- tables
- code blocks
- YouTube embeds
- related-content blocks
- fact boxes
- attachment blocks

### Import and export

- source/HTML mode
- HTML export
- PDF export through the browser print flow
- DOCX import with an optional browser parser
- DOCX export with an optional adapter and Word-compatible fallback
- Markdown import and export

### Editing tools

- undo and redo
- find and replace
- special characters and emoji
- paste cleanup
- word count and reading-time estimate
- keyboard shortcuts

### Developer features

- synchronized textarea output
- multiple editor instances on one page
- browser bundle, ES module, CommonJS, and React builds
- TypeScript declarations
- plugin registration and sanitizer extension hooks
- configurable upload adapter
- Python packaging and framework integrations

## Configuration

Browser-bundle integrations can pass editor options directly:

```js
const editor = window.OllowEditor.create(
  document.getElementById("editor"),
  {
    theme: "auto",
    persistTheme: true,
    upload: {
      imageUrl: "/api/uploads/images",
      galleryUrl: "/api/uploads/galleries",
      attachmentUrl: "/api/uploads/attachments",
      allowFallback: false
    },
    plugins: {
      callout: true
    }
  }
);
```

Common browser runtime options verified in the shipped code include:

- `theme`
- `persistTheme`
- `themeStorageKey`
- `placeholder`
- `autosaveDelay`
- `readOnly`
- `upload`
- `uploadHeaders`
- `uploadMethod`
- `plugins`
- `docx`

Module-wrapper options are intentionally smaller and typed separately:

- `initialHTML`
- `placeholder`
- `readOnly`
- `className`
- `onChange`
- `uploadImage`

Detailed reference: [docs/configuration.md](https://github.com/jakiiii/olloweditor/tree/main/docs/configuration.md)

## Upload integration

OllowEditor supports upload flows for:

- images
- galleries
- attachments
- drag-and-drop image insertion

Recommended response contracts:

```json
{ "url": "/media/editor/images/file.jpg" }
```

```json
{ "urls": ["/media/editor/gallery/1.jpg", "/media/editor/gallery/2.jpg"] }
```

Request field names:

- image and gallery uploads use `image`
- attachment uploads use `file`

CSRF behavior in the browser runtime:

- uses configured headers when present
- otherwise looks for `csrfmiddlewaretoken`
- otherwise falls back to the `csrftoken` cookie

Fallback behavior:

- no upload URL for images or galleries: uses `FileReader`
- configured upload URL with `allowFallback: true`: falls back to local image data URLs after failure
- attachments require a configured upload URL

Detailed upload notes: [docs/uploads.md](https://github.com/jakiiii/olloweditor/tree/main/docs/uploads.md)

## Public API

Browser bundle globals:

- `window.OllowEditor.create(target, options)`
- `window.OllowEditor.init(target, options)` alias of `create`
- `window.OllowEditor.initAll(root, options)`
- `window.OllowEditor.get(target)`
- `window.OllowEditor.instances()`
- `window.OllowEditor.registerPlugin(name, factory)`

Common instance methods verified in the runtime:

- `getHTML()`
- `setHTML(html)`
- `sync(options)`
- `focus()`
- `clear()`
- `destroy()`

Module exports:

- `createOllowEditor`
- `OllowEditorCore`
- default export = `createOllowEditor`
- React subpath export = `@codefortify/olloweditor/react`

Compatibility note:

- the underlying runtime still exposes `window.NationWireEditor` as a legacy alias
- `initAll()` scans `textarea[data-nw-editor]` and `textarea[data-ollow-editor]`
- the Python auto-init helper uses `data-olloweditor="true"` and `data-olloweditor-options`

More detail: [docs/api.md](https://github.com/jakiiii/olloweditor/tree/main/docs/api.md)

## Plugin API

Plugins are registered globally and enabled per editor.

```js
window.OllowEditor.registerPlugin("callout", (editor) => {
  editor.addToolbarButton({
    name: "callout",
    label: "Callout",
    group: "blocks",
    onClick() {
      editor.insertHTML(
        '<section class="ollow-alert-box"><p>Callout text</p></section>'
      );
    }
  });
});

window.OllowEditor.create(document.getElementById("editor"), {
  plugins: {
    callout: true
  }
});
```

Verified plugin-facing hooks include:

- `addToolbarGroup()`
- `addToolbarButton()`
- `addCommand()`
- `runCommand()`
- `on()` / `off()` / `emit()`
- `addShortcut()` / `removeShortcut()` / `getShortcuts()`
- `addSanitizerRule()`
- `insertHTML()`

See [docs/plugins.md](https://github.com/jakiiii/olloweditor/tree/main/docs/plugins.md).

## Responsive editing

OllowEditor ships one runtime with multiple presentation modes:

- desktop menu bar and grouped toolbar
- compact tablet layout with overflow handling
- mobile toolbar and action drawer
- floating image, table, and bookmark controls

The command set is shared across breakpoints. The interface changes, but the saved HTML model does not.

## Browser support

OllowEditor targets current stable versions of Chrome, Edge, Firefox, and Safari.

## Security

OllowEditor sanitizes and normalizes content on the client, including pasted HTML, source-mode edits, Markdown import, DOCX import, URLs, embeds, and plugin-inserted markup.

That is not a complete security boundary. If content is untrusted, the host application still needs to:

- validate and sanitize HTML on the server
- validate upload authorization, MIME type, extension, and size
- apply normal CSRF protection on upload endpoints
- use an appropriate Content Security Policy

Security details:

- [docs/security.md](https://github.com/jakiiii/olloweditor/tree/main/docs/security.md)
- [python/docs/security.md](https://github.com/jakiiii/olloweditor/tree/main/python/docs/security.md)

## Development

Frontend commands verified from `package.json`:

```bash
npm install
npm run dev
npm run build
npm run typecheck
npm test
npm run build:python-assets
npm run verify:python-assets
```

Python package workflow:

```bash
cd python
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e ".[dev,test,all]"
python scripts/verify_release.py
```

## Project structure

```text
olloweditor/
├── ollow.js
├── ollow.css
├── dist/
├── examples/
├── tests/
├── scripts/
├── website/
├── python/
└── README.md
```

## Documentation

- [Configuration](https://github.com/jakiiii/olloweditor/tree/main/docs/configuration.md)
- [JavaScript API](https://github.com/jakiiii/olloweditor/tree/main/docs/api.md)
- [Uploads](https://github.com/jakiiii/olloweditor/tree/main/docs/uploads.md)
- [Plugins](https://github.com/jakiiii/olloweditor/tree/main/docs/plugins.md)
- [Security](https://github.com/jakiiii/olloweditor/tree/main/docs/security.md)
- [Python package](https://github.com/jakiiii/olloweditor/tree/main/python/README.md)
- [Python release audit](https://github.com/jakiiii/olloweditor/tree/main/python/RELEASE_AUDIT.md)

## Examples

- Browser bundle example: [examples/browser/basic.html](https://github.com/jakiiii/olloweditor/tree/main/examples/browser/basic.html)
- Python examples: [python/examples/README.md](https://github.com/jakiiii/olloweditor/tree/main/python/examples/README.md)
- Website and long-form docs source: [website/](https://github.com/jakiiii/olloweditor/tree/main/website)

## Roadmap

No separate roadmap document is maintained in the repository. Use the issue tracker for planned work and design discussion:

- [GitHub Issues](https://github.com/jakiiii/olloweditor/issues)

## Contributing

1. Fork the repository.
2. Create a topic branch.
3. Add or update tests with your change.
4. Run the relevant frontend and Python verification commands.
5. Open a pull request with implementation notes and any compatibility impact.

## License

OllowEditor is released under the [MIT License](python/LICENSE).

## Project links

- Repository: <https://github.com/jakiiii/olloweditor>
- Issue tracker: <https://github.com/jakiiii/olloweditor/issues>
- npm package: <https://www.npmjs.com/package/@codefortify/olloweditor>
- Python package docs: <https://github.com/jakiiii/olloweditor/tree/main/python>
- Website source: <https://github.com/jakiiii/olloweditor/tree/main/website>
