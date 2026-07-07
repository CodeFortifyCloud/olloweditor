import type { ForwardRefExoticComponent, RefAttributes, TextareaHTMLAttributes } from "react";
import type { OllowEditorInstance, OllowEditorOptions } from "./index";

export interface ReactOllowEditorProps {
  value?: string;
  defaultValue?: string;
  options?: OllowEditorOptions;
  onChange?: (value: string, editor: OllowEditorInstance) => void;
  onReady?: (editor: OllowEditorInstance) => void;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export declare const OllowEditor: ForwardRefExoticComponent<
  ReactOllowEditorProps & RefAttributes<OllowEditorInstance | null>
>;

export default OllowEditor;
