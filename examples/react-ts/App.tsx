import "olloweditor/styles.css";
import { OllowEditor } from "olloweditor/react";

export default function App() {
  return (
    <OllowEditor
      options={{ theme: "auto", persistTheme: true }}
      textareaProps={{ name: "body", placeholder: "Start writing..." }}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
}
