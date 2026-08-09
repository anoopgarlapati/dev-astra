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

export type Base64Input = {
  mode: "encode" | "decode";
  text: string;
};

export type Base64Output = {
  text: string;
};

function encode(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function decode(text: string): string {
  const binary = atob(text);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export const base64Tool: Tool<Base64Input, Base64Output> = {
  id: "base64",
  name: "Base64",
  description: "Encode or decode Base64 text.",
  category: "encoding",
  docs: {
    summary:
      "Encode UTF-8 text to Base64, or decode Base64 back to text. Runs entirely in your browser.",
    examples: [
      {
        title: "Encode",
        input: "hello",
        output: "aGVsbG8=",
      },
      {
        title: "Decode",
        input: "aGVsbG8=",
        output: "hello",
      },
    ],
  },
  run(input) {
    try {
      if (input.mode === "encode") {
        return ok({ text: encode(input.text) });
      }
      return ok({ text: decode(input.text) });
    } catch {
      return err("Invalid Base64 input.", "INVALID_BASE64");
    }
  },
};
