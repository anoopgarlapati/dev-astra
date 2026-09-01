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
import {
  jwtHighlightRanges,
  shouldHighlight,
} from "./syntax";

describe("shouldHighlight", () => {
  test("json only when parseable", () => {
    expect(shouldHighlight("json", '{"a":1}')).toBe(true);
    expect(shouldHighlight("json", "{")).toBe(false);
    expect(shouldHighlight("json", "")).toBe(false);
    expect(shouldHighlight("json", "   ")).toBe(false);
  });

  test("yaml only when yaml-to-json succeeds", () => {
    expect(shouldHighlight("yaml", "a: 1\n")).toBe(true);
    expect(shouldHighlight("yaml", "a:\n  b: 1\n c: 2")).toBe(false);
    expect(shouldHighlight("yaml", "")).toBe(false);
  });

  test("jwt only with three dot-separated parts", () => {
    expect(shouldHighlight("jwt", "aaa.bbb.ccc")).toBe(true);
    expect(shouldHighlight("jwt", "aaa.bbb.")).toBe(true);
    expect(shouldHighlight("jwt", "aaa.bbb")).toBe(false);
    expect(shouldHighlight("jwt", "")).toBe(false);
  });

  test("plain never highlights", () => {
    expect(shouldHighlight("plain", '{"a":1}')).toBe(false);
  });
});

describe("jwtHighlightRanges", () => {
  test("returns null when not three parts", () => {
    expect(jwtHighlightRanges("aaa.bbb")).toBeNull();
  });

  test("marks header, dots, payload, and signature", () => {
    expect(jwtHighlightRanges("aa.bbb.cc")).toEqual([
      { from: 0, to: 2, part: "header" },
      { from: 2, to: 3, part: "dot" },
      { from: 3, to: 6, part: "payload" },
      { from: 6, to: 7, part: "dot" },
      { from: 7, to: 9, part: "signature" },
    ]);
  });

  test("allows an empty signature and leading whitespace", () => {
    expect(jwtHighlightRanges("  h.p.")).toEqual([
      { from: 2, to: 3, part: "header" },
      { from: 3, to: 4, part: "dot" },
      { from: 4, to: 5, part: "payload" },
      { from: 5, to: 6, part: "dot" },
    ]);
  });
});
