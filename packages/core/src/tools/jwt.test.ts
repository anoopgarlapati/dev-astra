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
import { jwtTool } from "./jwt";

const header = btoa(JSON.stringify({ alg: "none" }))
  .replaceAll("=", "")
  .replaceAll("+", "-")
  .replaceAll("/", "_");
const payload = btoa(JSON.stringify({ sub: "1" }))
  .replaceAll("=", "")
  .replaceAll("+", "-")
  .replaceAll("/", "_");
const SAMPLE = `${header}.${payload}.`;

describe("jwtTool", () => {
  test("decodes header and payload", () => {
    const result = jwtTool.run({ token: SAMPLE });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.header).toEqual({ alg: "none" });
      expect(result.data.payload).toEqual({ sub: "1" });
    }
  });

  test("rejects malformed token", () => {
    const result = jwtTool.run({ token: "not-a-jwt" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INVALID_JWT");
    }
  });

  test("rejects payload with invalid UTF-8", () => {
    const badPayload = btoa(String.fromCharCode(0xff))
      .replaceAll("=", "")
      .replaceAll("+", "-")
      .replaceAll("/", "_");
    const result = jwtTool.run({ token: `${header}.${badPayload}.` });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INVALID_JWT");
    }
  });
});
