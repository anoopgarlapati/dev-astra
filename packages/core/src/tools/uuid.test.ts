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
import { uuidTool } from "./uuid";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("uuidTool", () => {
  test("generates a UUID v4", () => {
    const result = uuidTool.run({ mode: "generate" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.value).toMatch(UUID_RE);
    }
  });

  test("validates a good UUID v4", () => {
    const generated = uuidTool.run({ mode: "generate" });
    expect(generated.ok).toBe(true);
    if (!generated.ok) return;
    const result = uuidTool.run({
      mode: "validate",
      value: generated.data.value,
    });
    expect(result).toEqual({
      ok: true,
      data: { value: generated.data.value, valid: true },
    });
  });

  test("validate returns valid false for garbage", () => {
    const result = uuidTool.run({ mode: "validate", value: "nope" });
    expect(result).toEqual({
      ok: true,
      data: { value: "nope", valid: false },
    });
  });

  test("validate rejects empty or missing value with INVALID_UUID", () => {
    for (const input of [
      { mode: "validate" as const, value: "" },
      { mode: "validate" as const },
    ]) {
      const result = uuidTool.run(input);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe("INVALID_UUID");
      }
    }
  });
});
