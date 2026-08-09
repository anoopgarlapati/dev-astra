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
import { base64Tool } from "./base64";

describe("base64Tool", () => {
  test("encodes UTF-8 text", () => {
    const result = base64Tool.run({ mode: "encode", text: "hi" });
    expect(result).toEqual({ ok: true, data: { text: "aGk=" } });
  });

  test("decodes base64 text", () => {
    const result = base64Tool.run({ mode: "decode", text: "aGk=" });
    expect(result).toEqual({ ok: true, data: { text: "hi" } });
  });

  test("returns error on invalid base64", () => {
    const result = base64Tool.run({ mode: "decode", text: "!!!" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message.length).toBeGreaterThan(0);
      expect(result.error.code).toBe("INVALID_BASE64");
    }
  });
});
