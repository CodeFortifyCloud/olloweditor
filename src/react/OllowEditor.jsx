import { forwardRef, useEffect, useRef } from "react";
import { OllowEditor as OllowEditorCore } from "../core/ollow-editor.js";

function mergeRefs(forwardedRef, value) {
  if (!forwardedRef) {
    return;
  }
  if (typeof forwardedRef === "function") {
    forwardedRef(value);
    return;
  }
  forwardedRef.current = value;
}

function OllowEditorComponent(
  {
    value,
    defaultValue,
    options,
    onChange,
    onReady,
    textareaProps = {},
  },
  forwardedRef
) {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return undefined;
    }

    if (typeof value === "string" && textarea.value !== value) {
      textarea.value = value;
    }

    const editor = OllowEditorCore.init(textarea, options);
    editorRef.current = editor;
    mergeRefs(forwardedRef, editor);

    if (editor && typeof onChange === "function") {
      editor.on("change", () => {
        editor.sync();
        onChange(textarea.value, editor);
      });
    }

    if (editor && typeof onReady === "function") {
      onReady(editor);
    }

    return () => {
      mergeRefs(forwardedRef, null);
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    const editor = editorRef.current;
    if (!textarea || !editor || typeof value !== "string" || textarea.value === value) {
      return;
    }
    textarea.value = value;
    editor.setHTML(value);
    editor.sync();
  }, [value]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !options) {
      return;
    }
    editor.options = Object.assign({}, editor.options, options);
  }, [options]);

  const resolvedDefaultValue = typeof value === "string" ? value : defaultValue;

  return (
    <textarea
      {...textareaProps}
      ref={textareaRef}
      defaultValue={resolvedDefaultValue}
      data-nw-editor={textareaProps["data-nw-editor"] ?? ""}
    />
  );
}

export const OllowEditor = forwardRef(OllowEditorComponent);
export default OllowEditor;
