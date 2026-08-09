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

export type JsonInput = { mode: "format" | "minify"; text: string };
export type JsonOutput = { text: string };

export const jsonTool: Tool<JsonInput, JsonOutput> = {
  id: "json",
  name: "JSON",
  description: "Format or minify JSON.",
  category: "data",
  run(input) {
    try {
      const value = JSON.parse(input.text);
      const text =
        input.mode === "format"
          ? JSON.stringify(value, null, 2)
          : JSON.stringify(value);
      return ok({ text });
    } catch {
      return err("Invalid JSON.", "INVALID_JSON");
    }
  },
};
