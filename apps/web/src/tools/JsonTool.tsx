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

import { jsonTool, type JsonInput } from "@dev-astra/core";
import { useState } from "react";
import { CopyButton } from "../components/CopyButton";
import { ToolShell } from "../components/ToolShell";

export function JsonTool() {
  const [mode, setMode] = useState<JsonInput["mode"]>("format");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [error, setError] = useState<string | undefined>();

  function run() {
    const result = jsonTool.run({ mode, text });
    if (result.ok) {
      setOutput(result.data.text);
      setHasResult(true);
      setError(undefined);
    } else {
      setOutput("");
      setHasResult(false);
      setError(result.error.message);
    }
  }

  return (
    <ToolShell title="JSON">
      <div className="tool-layout">
        <div className="field">
          <label htmlFor="json-mode">Mode</label>
          <select
            id="json-mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as JsonInput["mode"])}
          >
            <option value="format">Format</option>
            <option value="minify">Minify</option>
          </select>
        </div>
        <div className="field">
          <div className="field-label-row">
            <label htmlFor="json-input">Input</label>
            <CopyButton value={text} />
          </div>
          <textarea
            id="json-input"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="button" className="button-primary" onClick={run}>
          Run
        </button>
        {error ? <p className="error">{error}</p> : null}
        {hasResult ? (
          <div className="field">
            <div className="field-label-row">
              <label htmlFor="json-output">Output</label>
              <CopyButton value={output} />
            </div>
            <pre id="json-output" className="output">
              {output}
            </pre>
          </div>
        ) : null}
      </div>
    </ToolShell>
  );
}
