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

import type { Tool } from "./types";
import { base64Tool } from "./tools/base64";
import { jsonTool } from "./tools/json";
import { jwtTool } from "./tools/jwt";
import { uuidTool } from "./tools/uuid";
import { yamlTool } from "./tools/yaml";

const tools: Tool[] = [
  base64Tool,
  jwtTool,
  jsonTool,
  yamlTool,
  uuidTool,
];

export function listTools(): Tool[] {
  return [...tools];
}

export function getTool(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}
