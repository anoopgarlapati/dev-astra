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

export function HomePage() {
  return (
    <main className="content">
      <h1 className="brand">Dev Astra</h1>
      <p className="tagline">
        Self-hosted developer toolkit. Transformations run in your browser — nothing
        is sent to a server.
      </p>
      <p className="lede">
        Pick a tool from the sidebar to encode, decode, format, or generate values.
      </p>
    </main>
  );
}
