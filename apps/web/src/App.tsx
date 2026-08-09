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

import { listTools } from "@dev-astra/core";
import { Route, Routes } from "react-router-dom";

function HomePage() {
  const tools = listTools();

  return (
    <main className="app">
      <h1 className="brand">Dev Astra</h1>
      <p className="tagline">
        Self-hosted developer toolkit. Transformations run in your browser.
      </p>

      {tools.length === 0 ? (
        <p className="empty">No tools registered yet. Starter tools arrive in 0.1.0.</p>
      ) : (
        <ul className="tool-list">
          {tools.map((tool) => (
            <li key={tool.id}>
              <div className="tool-name">{tool.name}</div>
              <p className="tool-desc">{tool.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
