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

import { jwtTool } from "@dev-astra/core";
import { useState } from "react";
import { ToolShell } from "../components/ToolShell";

export function JwtTool() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState<string | undefined>();

  function run() {
    const result = jwtTool.run({ token });
    if (result.ok) {
      setHeader(JSON.stringify(result.data.header, null, 2));
      setPayload(JSON.stringify(result.data.payload, null, 2));
      setSignature(result.data.signature);
      setError(undefined);
    } else {
      setHeader("");
      setPayload("");
      setSignature("");
      setError(result.error.message);
    }
  }

  return (
    <ToolShell title="JWT">
      <div className="tool-layout">
        <div className="field">
          <label htmlFor="jwt-token">Token</label>
          <textarea
            id="jwt-token"
            rows={5}
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <button type="button" onClick={run}>
          Decode
        </button>
        {error ? <p className="error">{error}</p> : null}
        {(header || payload || signature) && (
          <div className="panels">
            <div className="panel">
              <h2>Header</h2>
              <pre>{header}</pre>
            </div>
            <div className="panel">
              <h2>Payload</h2>
              <pre>{payload}</pre>
            </div>
            <div className="panel">
              <h2>Signature</h2>
              <pre>{signature}</pre>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
