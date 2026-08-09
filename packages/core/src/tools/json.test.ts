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
import { jsonTool } from "./json";

describe("jsonTool", () => {
  test("formats JSON", () => {
    const result = jsonTool.run({ mode: "format", text: '{"a":1}' });
    expect(result).toEqual({ ok: true, data: { text: '{\n  "a": 1\n}' } });
  });

  test("minifies JSON", () => {
    const result = jsonTool.run({ mode: "minify", text: '{\n  "a": 1\n}' });
    expect(result).toEqual({ ok: true, data: { text: '{"a":1}' } });
  });

  test("rejects invalid JSON", () => {
    const result = jsonTool.run({ mode: "format", text: "{" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("INVALID_JSON");
  });
});
