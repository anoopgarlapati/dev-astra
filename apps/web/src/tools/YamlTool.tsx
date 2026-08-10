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

import { yamlTool, type YamlInput } from "@dev-astra/core";
import { useState } from "react";
import { CopyButton } from "../components/CopyButton";
import { SelectControl } from "../components/SelectControl";
import { ToolShell } from "../components/ToolShell";

export function YamlTool() {
  const [mode, setMode] = useState<YamlInput["mode"]>("yaml-to-json");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [error, setError] = useState<string | undefined>();

  function run() {
    const result = yamlTool.run({ mode, text });
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
    <ToolShell title="YAML" docs={yamlTool.docs}>
      <div className="tool-layout">
        <div className="field">
          <label htmlFor="yaml-mode">Mode</label>
          <SelectControl
            id="yaml-mode"
            value={mode}
            options={[
              { value: "yaml-to-json", label: "YAML → JSON" },
              { value: "json-to-yaml", label: "JSON → YAML" },
            ]}
            onChange={(next) => setMode(next as YamlInput["mode"])}
          />
        </div>
        <div className="field">
          <div className="field-label-row">
            <label htmlFor="yaml-input">Input</label>
            <CopyButton value={text} />
          </div>
          <textarea
            id="yaml-input"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="button" className="button-primary" onClick={run}>
          Convert
        </button>
        {error ? <p className="error">{error}</p> : null}
        {hasResult ? (
          <div className="field">
            <div className="field-label-row">
              <label htmlFor="yaml-output">Output</label>
              <CopyButton value={output} />
            </div>
            <pre id="yaml-output" className="output">
              {output}
            </pre>
          </div>
        ) : null}
      </div>
    </ToolShell>
  );
}
