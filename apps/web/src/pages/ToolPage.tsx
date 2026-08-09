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

import { getTool } from "@dev-astra/core";
import { useParams } from "react-router-dom";
import { ToolShell } from "../components/ToolShell";
import { Base64Tool } from "../tools/Base64Tool";
import { JsonTool } from "../tools/JsonTool";
import { JwtTool } from "../tools/JwtTool";
import { UuidTool } from "../tools/UuidTool";
import { YamlTool } from "../tools/YamlTool";

export function ToolPage() {
  const { id } = useParams();
  const tool = id ? getTool(id) : undefined;

  if (!tool) {
    return (
      <ToolShell title="Not found">
        <p className="empty">No tool with id “{id ?? ""}”.</p>
      </ToolShell>
    );
  }

  switch (tool.id) {
    case "base64":
      return <Base64Tool />;
    case "jwt":
      return <JwtTool />;
    case "json":
      return <JsonTool />;
    case "yaml":
      return <YamlTool />;
    case "uuid":
      return <UuidTool />;
    default:
      return <ToolShell title={tool.name}>Unsupported.</ToolShell>;
  }
}
