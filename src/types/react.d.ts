import type { ComponentType } from "react";

export interface OllowEditorReactProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  uploadImage?: (file: File) => Promise<string> | string;
  readOnly?: boolean;
  className?: string;
}

export declare const OllowEditor: ComponentType<OllowEditorReactProps>;
export default OllowEditor;
