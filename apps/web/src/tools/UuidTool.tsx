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

import { uuidTool, type UuidInput } from "@dev-astra/core";
import { useState } from "react";
import { CopyButton } from "../components/CopyButton";
import { ToolShell } from "../components/ToolShell";

export function UuidTool() {
  const [mode, setMode] = useState<UuidInput["mode"]>("generate");
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | undefined>();

  function run() {
    const result = uuidTool.run(
      mode === "generate" ? { mode } : { mode, value },
    );
    if (result.ok) {
      if (mode === "generate") {
        setOutput(result.data.value);
      } else {
        setOutput(
          result.data.valid
            ? `${result.data.value} is a valid UUID v4`
            : `${result.data.value} is not a valid UUID v4`,
        );
      }
      setError(undefined);
    } else {
      setOutput("");
      setError(result.error.message);
    }
  }

  return (
    <ToolShell title="UUID v4" docs={uuidTool.docs}>
      <div className="tool-layout">
        <div className="field">
          <label htmlFor="uuid-mode">Mode</label>
          <select
            id="uuid-mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as UuidInput["mode"])}
          >
            <option value="generate">Generate UUID v4</option>
            <option value="validate">Validate UUID v4</option>
          </select>
        </div>
        {mode === "validate" ? (
          <div className="field">
            <div className="field-label-row">
              <label htmlFor="uuid-value">UUID v4</label>
              <CopyButton value={value} />
            </div>
            <input
              id="uuid-value"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        ) : null}
        <button type="button" className="button-primary" onClick={run}>
          {mode === "generate" ? "Generate" : "Validate"}
        </button>
        {error ? <p className="error">{error}</p> : null}
        {output ? (
          <div className="field">
            <div className="field-label-row">
              <label htmlFor="uuid-output">Result</label>
              <CopyButton value={output} />
            </div>
            <pre id="uuid-output" className="output">
              {output}
            </pre>
          </div>
        ) : null}
      </div>
    </ToolShell>
  );
}
