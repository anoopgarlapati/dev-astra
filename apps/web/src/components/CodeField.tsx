/*
 * Copyright Anoop Garlapati
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { json } from "@codemirror/lang-json";
import { yaml } from "@codemirror/lang-yaml";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import type { CodeLanguage } from "@dev-astra/core";
import { tags } from "@lezer/highlight";
import CodeMirror from "@uiw/react-codemirror";
import { useMemo } from "react";
import { jwtHighlight } from "../highlight/jwt";
import { shouldHighlight } from "../highlight/syntax";

const highlightStyle = HighlightStyle.define([
  { tag: tags.propertyName, color: "var(--syn-key)" },
  { tag: tags.string, color: "var(--syn-string)" },
  { tag: tags.number, color: "var(--syn-number)" },
  { tag: tags.bool, color: "var(--syn-keyword)" },
  { tag: tags.null, color: "var(--syn-keyword)" },
  { tag: tags.keyword, color: "var(--syn-keyword)" },
  { tag: tags.atom, color: "var(--syn-keyword)" },
  { tag: tags.literal, color: "var(--syn-keyword)" },
  { tag: tags.comment, color: "var(--syn-comment)" },
  { tag: tags.punctuation, color: "var(--syn-punct)" },
]);

const editorTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent",
    color: "var(--ink)",
    fontSize: "inherit",
  },
  ".cm-content": {
    fontFamily: "var(--mono)",
    padding: "0.7rem 0.8rem",
    caretColor: "var(--ink)",
  },
  ".cm-scroller": {
    fontFamily: "var(--mono)",
    lineHeight: "1.5",
    overflow: "auto",
  },
  "&.cm-focused": { outline: "none" },
  ".cm-gutters": { display: "none" },
  ".cm-activeLine": { backgroundColor: "transparent" },
  ".cm-jwt-header": { color: "var(--jwt-header)" },
  ".cm-jwt-payload": { color: "var(--jwt-payload)" },
  ".cm-jwt-signature": { color: "var(--jwt-signature)" },
  ".cm-jwt-dot": { color: "var(--muted)" },
});

type CodeFieldProps = {
  id: string;
  value: string;
  language: CodeLanguage;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  minHeight?: string;
  variant?: "field" | "panel" | "docs";
};

export function CodeField({
  id,
  value,
  language,
  onChange,
  readOnly = false,
  minHeight,
  variant = "field",
}: CodeFieldProps) {
  const highlighted = shouldHighlight(language, value);
  const extensions = useMemo(() => {
    const extras = [];
    if (language === "json" && highlighted) extras.push(json());
    if (language === "yaml" && highlighted) extras.push(yaml());
    if (language === "jwt") extras.push(jwtHighlight);
    return [
      EditorView.lineWrapping,
      EditorView.contentAttributes.of({ id }),
      editorTheme,
      syntaxHighlighting(highlightStyle),
      ...extras,
    ];
  }, [id, language, highlighted]);

  return (
    <div
      className={`code-field code-field--${variant}${readOnly ? " code-field--readonly" : ""}`}
    >
      <CodeMirror
        value={value}
        height="auto"
        minHeight={minHeight}
        theme="none"
        editable={!readOnly}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          autocompletion: false,
          syntaxHighlighting: false,
          bracketMatching: true,
        }}
        extensions={extensions}
        onChange={onChange}
      />
    </div>
  );
}
