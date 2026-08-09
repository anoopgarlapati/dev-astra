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

import type { ToolDocs } from "@dev-astra/core";
import { useState, type ReactNode } from "react";

type ToolShellProps = {
  title: string;
  docs: ToolDocs;
  error?: string;
  children?: ReactNode;
};

export function ToolShell({ title, docs, error, children }: ToolShellProps) {
  const [docsOpen, setDocsOpen] = useState(false);

  return (
    <main className={`tool-page${docsOpen ? " tool-page--docs-open" : ""}`}>
      <div className="tool-main">
        <div className="tool-main-inner">
          <h1 className="tool-title">{title}</h1>
          <div className="tool-workspace">
            {error ? <p className="error">{error}</p> : null}
            {children}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="docs-fab"
        aria-expanded={docsOpen}
        aria-controls="tool-docs-panel"
        aria-label="Show documentation"
        aria-hidden={docsOpen}
        tabIndex={docsOpen ? -1 : 0}
        onClick={() => setDocsOpen(true)}
      >
        <span className="docs-fab-chevrons" aria-hidden="true">
          «
        </span>
        <span className="docs-fab-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="docs-fab-label">Tool Docs</span>
      </button>

      <aside
        id="tool-docs-panel"
        className="tool-docs"
        aria-label="Tool documentation"
        aria-hidden={!docsOpen}
        inert={!docsOpen ? true : undefined}
      >
        <div className="tool-docs-top">
          <button
            type="button"
            className="docs-collapse"
            aria-expanded={docsOpen}
            aria-controls="tool-docs-panel"
            aria-label="Hide documentation"
            tabIndex={docsOpen ? 0 : -1}
            onClick={() => setDocsOpen(false)}
          >
            <span aria-hidden="true">›</span>
          </button>
          <p className="tool-docs-heading">
            <span className="tool-docs-heading-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            Tool Docs: {title}
          </p>
        </div>
        <p className="tool-docs-summary">{docs.summary}</p>
        {docs.examples && docs.examples.length > 0 ? (
          <div className="tool-docs-examples">
            {docs.examples.map((example) => (
              <div key={example.title} className="tool-docs-example">
                <h3>{example.title}</h3>
                <p className="tool-docs-label">Input</p>
                <pre>{example.input}</pre>
                {example.output != null ? (
                  <>
                    <p className="tool-docs-label">Output</p>
                    <pre>{example.output}</pre>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </aside>
    </main>
  );
}
