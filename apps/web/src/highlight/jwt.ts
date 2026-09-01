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

import { RangeSetBuilder, type Extension } from "@codemirror/state";
import {
  Decoration,
  ViewPlugin,
  type DecorationSet,
  type EditorView,
  type ViewUpdate,
} from "@codemirror/view";
import { jwtHighlightRanges } from "./syntax";

const marks = {
  header: Decoration.mark({ class: "cm-jwt-header" }),
  payload: Decoration.mark({ class: "cm-jwt-payload" }),
  signature: Decoration.mark({ class: "cm-jwt-signature" }),
  dot: Decoration.mark({ class: "cm-jwt-dot" }),
};

function decorationsFor(text: string): DecorationSet {
  const ranges = jwtHighlightRanges(text);
  if (!ranges) return Decoration.none;
  const builder = new RangeSetBuilder<Decoration>();
  for (const range of ranges) {
    builder.add(range.from, range.to, marks[range.part]);
  }
  return builder.finish();
}

export const jwtHighlight: Extension = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = decorationsFor(view.state.doc.toString());
    }
    update(update: ViewUpdate) {
      if (update.docChanged) {
        this.decorations = decorationsFor(update.state.doc.toString());
      }
    }
  },
  { decorations: (plugin) => plugin.decorations },
);
