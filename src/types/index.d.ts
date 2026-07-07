export type OllowEditorTheme = "light" | "dark" | "auto";

export interface OllowEditorUploadOptions {
  imageUrl?: string;
  galleryUrl?: string;
  attachmentUrl?: string;
  allowFallback?: boolean;
  headers?: Record<string, string>;
  method?: string;
  credentials?: RequestCredentials;
  csrfHeaderValue?: string;
}

export interface OllowEditorDocxOptions {
  enabled?: boolean;
  parser?: unknown;
  exporter?: unknown;
}

export interface OllowEditorOptions {
  placeholder?: string;
  autosaveDelay?: number;
  theme?: OllowEditorTheme;
  persistTheme?: boolean;
  themeStorageKey?: string;
  upload?: OllowEditorUploadOptions;
  uploadHeaders?: Record<string, string>;
  uploadMethod?: string;
  uploadUrl?: string;
  docx?: OllowEditorDocxOptions;
  plugins?: Record<string, Record<string, unknown>>;
  [key: string]: unknown;
}

export interface OllowEditorToolbarButton {
  name: string;
  label: string;
  icon?: string;
  group?: string;
  title?: string;
  onClick: () => void;
}

export interface OllowEditorSanitizerRule {
  tags?: string[];
  attributes?: string[];
  classes?: string[];
}

export interface OllowEditorPluginApi {
  addToolbarButton(button: OllowEditorToolbarButton): void;
  addSanitizerRule(rule: OllowEditorSanitizerRule): void;
  insertHTML(html: string): void;
  [key: string]: unknown;
}

export type OllowEditorPluginFactory = (
  editor: OllowEditorPluginApi,
  options: Record<string, unknown>
) => unknown;

export interface OllowEditorInstance {
  textarea: HTMLTextAreaElement;
  options: OllowEditorOptions;
  init(): OllowEditorInstance;
  destroy(): void;
  sync(): void;
  setHTML(html: string, options?: Record<string, unknown>): void;
  getHTML?(): string;
  showSource?(): void;
  insertHTML?(html: string): void;
  on(eventName: string, handler: (...args: unknown[]) => void): void;
  off?(eventName: string, handler?: (...args: unknown[]) => void): void;
  [key: string]: unknown;
}

export interface OllowEditorApi {
  registerPlugin(name: string, factory: OllowEditorPluginFactory): OllowEditorPluginFactory | null;
  initAll(root?: ParentNode | Document, options?: OllowEditorOptions): OllowEditorInstance[];
  init(target: string | HTMLTextAreaElement, options?: OllowEditorOptions): OllowEditorInstance | null;
  get(target: string | HTMLTextAreaElement): OllowEditorInstance | null;
  instances(): OllowEditorInstance[];
}

declare const OllowEditor: OllowEditorApi;
declare const NationWireEditor: OllowEditorApi;

export { NationWireEditor, OllowEditor };
export default OllowEditor;
