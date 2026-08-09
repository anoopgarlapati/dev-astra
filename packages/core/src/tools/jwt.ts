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

import { err, ok } from "../result";
import type { Tool } from "../types";

export type JwtInput = { token: string };
export type JwtOutput = {
  header: unknown;
  payload: unknown;
  signature: string;
};

function base64UrlToJson(segment: string): unknown {
  const padded = segment + "=".repeat((4 - (segment.length % 4)) % 4);
  const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  return JSON.parse(text);
}

export const jwtTool: Tool<JwtInput, JwtOutput> = {
  id: "jwt",
  name: "JWT",
  description: "Decode a JWT header and payload (no verification).",
  category: "data",
  docs: {
    summary:
      "Split a JWT into header, payload, and signature. Decoding only — signatures are not verified. Do not paste secrets into untrusted environments.",
    examples: [
      {
        title: "Decode (header + payload shown)",
        input:
          "eyJhbGciOiJub25lIn0.eyJzdWIiOiIxMjM0IiwibmFtZSI6IkRldiBBc3RyYSJ9.",
        output:
          'header: { "alg": "none" }\npayload: { "sub": "1234", "name": "Dev Astra" }',
      },
    ],
  },
  run(input) {
    const parts = input.token.trim().split(".");
    if (parts.length !== 3) {
      return err("JWT must have three dot-separated parts.", "INVALID_JWT");
    }
    try {
      const [headerSeg, payloadSeg, signature = ""] = parts;
      return ok({
        header: base64UrlToJson(headerSeg),
        payload: base64UrlToJson(payloadSeg),
        signature,
      });
    } catch {
      return err("Could not decode JWT segments.", "INVALID_JWT");
    }
  },
};
