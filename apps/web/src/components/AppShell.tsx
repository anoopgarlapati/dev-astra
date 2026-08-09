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

import { listTools } from "@dev-astra/core";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export function AppShell() {
  const tools = listTools();
  const [navOpen, setNavOpen] = useState(false);

  function closeNav() {
    setNavOpen(false);
  }

  return (
    <div className={`shell${navOpen ? " shell--nav-open" : ""}`}>
      <header className="mobile-bar">
        <button
          type="button"
          className="menu-button"
          aria-expanded={navOpen}
          aria-controls="app-sidebar"
          onClick={() => setNavOpen((open) => !open)}
        >
          Menu
        </button>
        <Link className="mobile-brand" to="/" onClick={closeNav}>
          Dev Astra
        </Link>
      </header>

      {navOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close navigation"
          onClick={closeNav}
        />
      ) : null}

      <aside id="app-sidebar" className="sidebar">
        <Link className="sidebar-brand" to="/" onClick={closeNav}>
          Dev Astra
        </Link>
        <nav className="sidebar-nav" aria-label="Tools">
          <p className="sidebar-label">Tools</p>
          <ul>
            {tools.map((tool) => (
              <li key={tool.id}>
                <NavLink
                  to={`/tools/${tool.id}`}
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }
                  onClick={closeNav}
                >
                  {tool.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="shell-main">
        <Outlet />
      </div>
    </div>
  );
}
