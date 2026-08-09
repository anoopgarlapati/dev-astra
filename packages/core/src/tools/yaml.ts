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

import { dump, load } from "js-yaml";
import { err, ok } from "../result";
import type { Tool } from "../types";

export type YamlInput = {
  mode: "yaml-to-json" | "json-to-yaml";
  text: string;
};
export type YamlOutput = { text: string };

export const yamlTool: Tool<YamlInput, YamlOutput> = {
  id: "yaml",
  name: "YAML",
  description: "Convert between YAML and JSON.",
  category: "data",
  run(input) {
    try {
      if (input.mode === "yaml-to-json") {
        const value = load(input.text);
        return ok({ text: JSON.stringify(value, null, 2) });
      }
      const value = JSON.parse(input.text);
      return ok({ text: dump(value) });
    } catch {
      return err("Invalid YAML or JSON input.", "INVALID_YAML");
    }
  },
};
