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

import { useEffect, useId, useRef, useState } from "react";
import {
  applyResolvedTheme,
  applyThemePreference,
  getThemePreference,
  resolveTheme,
  subscribeSystemTheme,
  type ThemePreference,
} from "../theme";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function IconSystem() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PreferenceIcon({ preference }: { preference: ThemePreference }) {
  if (preference === "light") return <IconSun />;
  if (preference === "dark") return <IconMoon />;
  return <IconSystem />;
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>(() =>
    getThemePreference(),
  );
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    applyResolvedTheme(resolveTheme(preference));
    if (preference !== "system") return;
    return subscribeSystemTheme((resolved) => {
      applyResolvedTheme(resolved);
    });
  }, [preference]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(next: ThemePreference) {
    applyThemePreference(next);
    setPreference(next);
    setOpen(false);
  }

  return (
    <div className="theme-toggle" ref={rootRef} data-open={open ? "true" : undefined}>
      <button
        type="button"
        className="theme-toggle__trigger"
        aria-label="Theme"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <PreferenceIcon preference={preference} />
      </button>
      {open ? (
        <ul id={menuId} className="theme-toggle__menu" role="menu">
          {OPTIONS.map((opt) => (
            <li key={opt.value} role="none">
              <button
                type="button"
                role="menuitem"
                className="theme-toggle__option"
                data-selected={opt.value === preference || undefined}
                onClick={() => choose(opt.value)}
              >
                <span className="theme-toggle__option-icon" aria-hidden="true">
                  <PreferenceIcon preference={opt.value} />
                </span>
                <span className="theme-toggle__option-label">{opt.label}</span>
                {opt.value === preference ? (
                  <span className="theme-toggle__check" aria-hidden="true">
                    <IconCheck />
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
