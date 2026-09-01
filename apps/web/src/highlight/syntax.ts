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

import { yamlTool, type CodeLanguage } from "@dev-astra/core";

export type JwtPart = "header" | "payload" | "signature" | "dot";

export type JwtRange = { from: number; to: number; part: JwtPart };

export function isValidJson(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

export function isValidYaml(text: string): boolean {
  if (!text.trim()) return false;
  return yamlTool.run({ mode: "yaml-to-json", text }).ok;
}

export function jwtHighlightRanges(text: string): JwtRange[] | null {
  const start = text.search(/\S/);
  if (start === -1) return null;
  let end = text.length;
  while (end > start && /\s/.test(text[end - 1]!)) end--;
  const trimmed = text.slice(start, end);
  const parts = trimmed.split(".");
  if (parts.length !== 3) return null;

  const names = ["header", "payload", "signature"] as const;
  const ranges: JwtRange[] = [];
  let i = start;
  for (let p = 0; p < 3; p++) {
    const len = parts[p]!.length;
    if (len > 0) ranges.push({ from: i, to: i + len, part: names[p] });
    i += len;
    if (p < 2) {
      ranges.push({ from: i, to: i + 1, part: "dot" });
      i += 1;
    }
  }
  return ranges;
}

export function shouldHighlight(language: CodeLanguage, text: string): boolean {
  switch (language) {
    case "json":
      return isValidJson(text);
    case "yaml":
      return isValidYaml(text);
    case "jwt":
      return jwtHighlightRanges(text) !== null;
    case "plain":
      return false;
  }
}
