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
import { yamlTool } from "./yaml";

describe("yamlTool", () => {
  test("converts YAML to JSON", () => {
    const result = yamlTool.run({ mode: "yaml-to-json", text: "a: 1\n" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(JSON.parse(result.data.text)).toEqual({ a: 1 });
    }
  });

  test("converts JSON to YAML", () => {
    const result = yamlTool.run({
      mode: "json-to-yaml",
      text: '{"a":1}',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.text).toContain("a:");
    }
  });

  test("rejects invalid YAML", () => {
    const result = yamlTool.run({
      mode: "yaml-to-json",
      text: "a:\n  b: 1\n c: 2",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("INVALID_YAML");
  });
});
