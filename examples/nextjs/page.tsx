"use client";

import "olloweditor/styles.css";
import { OllowEditor } from "olloweditor/react";

export default function Page() {
  return (
    <OllowEditor
      options={{ theme: "auto", persistTheme: true }}
      textareaProps={{ name: "body" }}
    />
  );
}
