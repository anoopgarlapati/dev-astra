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

import { describe, expect, test } from "bun:test";
import { getTool, listTools } from "./registry";

describe("registry", () => {
  test("listTools returns five starter tools", () => {
    const tools = listTools();
    expect(tools.map((t) => t.id).sort()).toEqual([
      "base64",
      "json",
      "jwt",
      "uuid",
      "yaml",
    ]);
  });

  test("listTools returns a shallow copy", () => {
    const a = listTools();
    a.pop();
    expect(listTools()).toHaveLength(5);
  });

  test("getTool returns tools by id", () => {
    expect(getTool("base64")?.name).toBe("Base64");
    expect(getTool("missing")).toBeUndefined();
  });

  test("every tool has docs with a non-empty summary", () => {
    for (const tool of listTools()) {
      expect(tool.docs.summary.trim().length).toBeGreaterThan(0);
    }
  });

  test("uuid docs state v4-only behavior", () => {
    const uuid = getTool("uuid");
    expect(uuid?.description.toLowerCase()).toContain("v4");
    expect(uuid?.docs.summary.toLowerCase()).toContain("v4");
  });
});