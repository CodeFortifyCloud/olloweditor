import OllowEditor from "olloweditor";
import "olloweditor/styles.css";

const editor = OllowEditor.init("#editor", {
  theme: "auto",
  persistTheme: true,
});

editor?.on("change", () => {
  editor.sync();
});
