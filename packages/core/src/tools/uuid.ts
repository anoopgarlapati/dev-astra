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

export type UuidInput = {
  mode: "generate" | "validate";
  value?: string;
};
export type UuidOutput = {
  value: string;
  valid?: boolean;
};

const UUID_V4_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const uuidTool: Tool<UuidInput, UuidOutput> = {
  id: "uuid",
  name: "UUID",
  description: "Generate or validate a UUID v4 (version 4 only).",
  category: "text",
  docs: {
    summary:
      "Generate a random UUID v4 via crypto.randomUUID(), or validate that a string is a UUID v4. Other UUID versions are not generated or accepted as valid.",
    examples: [
      {
        title: "Validate UUID v4",
        input: "550e8400-e29b-41d4-a716-446655440000",
        output: "valid UUID v4",
      },
      {
        title: "Reject non-v4",
        input: "00000000-0000-1000-8000-000000000000",
        output: "not a valid UUID v4 (version nibble is not 4)",
      },
    ],
  },
  run(input) {
    if (input.mode === "generate") {
      return ok({ value: crypto.randomUUID() });
    }
    const value = input.value ?? "";
    if (!value) {
      return err("UUID value is required for validation.", "INVALID_UUID");
    }
    return ok({ value, valid: UUID_V4_RE.test(value) });
  },
};
