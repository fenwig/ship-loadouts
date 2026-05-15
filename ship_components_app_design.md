# Ship Components App — Design Document

**Last updated:** 2026-05-14
**Status:** Design phase — no code written yet
**Companion app:** TI Forgeworks (separate, see project_context.md)

---

## Purpose

A Star Citizen 4.8 ship loadout tracker. Helps a player manage which components are installed on each ship in their hangar, what's in their inventory, and what they still need to acquire or craft.

**The core concept** is tracking three states per component slot per ship:
- **Stock** — what the ship came with from the factory
- **Current** — what's installed right now
- **Target** — what the player wants installed (wishlist)

The gap between **Current** and **Target** drives the "Items Needed" view, which is the practical output of the whole app.

---

## User & Scope

- **Single user per instance.** No accounts, no auth, no multi-tenancy.
- **Distribution:** packaged and shared with friends via Discord or Google Drive. Each friend runs their own instance.
- **Updates:** new versions distributed manually as zip files; no auto-update.

---

## Tech Stack

Mirrors TI Forgeworks for consistency and because it's a proven pattern at this scale:

| Layer | Technology |
|---|---|
| **Frontend** | Vanilla HTML / CSS / JavaScript (no framework) |
| **Backend** | None — 100% client-side |
| **Persistence** | Browser localStorage |
| **Data source** | Star Citizen Wiki API for components/ships (TBD on exact endpoints); manual import from Forgeworks for crafted items |
| **Build/test** | None — files served directly, no build step |
| **Distribution** | Zip the folder, share via Discord (25 MB limit) or Google Drive |
| **Version control** | Git (local + GitHub backup) |

**Design system:** match Forgeworks. Same CSS variables, same fonts (Rajdhani / Share Tech Mono / Exo 2), same sci-fi HUD aesthetic, same clipped polygon buttons. Users running both apps should feel they're part of the same family.

---

## Relationship to TI Forgeworks

**Option 2 (fully separate apps) with a manual bridge.**

- Ship Components has its own folder, own files, own localStorage namespace (e.g. `shipcomp-*` keys).
- It does **not** read Forgeworks' localStorage. It has zero awareness of Forgeworks at runtime.
- Crafted components from Forgeworks enter Ship Components via a **manual JSON import**:
  - Forgeworks gets a new export button: "Export Crafted Items as JSON" (small addition to Module 07 Reports).
  - Ship Components has an import button in the Inventory module that accepts that JSON file.
- This works for friends regardless of whether they run Forgeworks.

---

## Modules

In rough build order:

### Module 01 — Dashboard
Iframe shell + navigation hub. Same pattern as Forgeworks Module 01. Status cards summarize:
- Number of ships in hangar
- Number of components in inventory
- Outstanding "items needed" count
- Last data sync date

### Module 02 — Hangar
The player's owned ships. Each ship has:
- Name / model / manufacturer
- Status: **Owned** (in-game) or **Pledged** (bought with real money, may not be in-game yet)
- Stock loadout reference (immutable, from API)
- Notes field

Comes from the Star Citizen Wiki API. Player marks which ships they have.

### Module 03 — Loadouts
The heart of the app. For each owned ship:
- Display every component slot the ship has
- For each slot, show three columns: **Stock** | **Current** | **Target**
- Stock is read-only (reference data)
- Current and Target are dropdowns sourced from inventory + crafted items
- Target can also be a "crafted spec" — pointing at a Forgeworks-imported crafted item or a manually-entered custom spec

### Module 04 — Inventory
Components the player owns that aren't currently installed on a ship. Includes:
- Stock components removed from ships
- Purchased components
- Imported crafted components from Forgeworks
- Manually entered custom components (with material quality 1–100 translating to stats, or stats set manually)

CRUD operations: add, edit, remove, mark as installed (which links it to a ship slot in Module 03).

### Module 05 — Items Needed
**Derived view, not its own data store.** Computed from the gap between Current and Target across all ships.

Outputs:
- Per-component-type breakdown: "You need 3 Coolers (Military, Size 2, Grade B+)"
- Source hints: which can be bought, which need crafting (cross-referenced against imported Forgeworks data)
- Priority sort by ship or by component type

### Module 06 — Data Sync
Pulls ship and component reference data from the Star Citizen Wiki API. Mirrors Forgeworks Module 09 pattern:
- UUID-stable across re-syncs (preserve user's hangar/loadout flags)
- Sync log (last 20 syncs)
- Sync metadata (date, game version, count)

### Module 07 — Reports
Generate a ship specification sheet:
- One ship: full loadout image + specs (printable / shareable)
- Multiple ships: hangar summary
- Optional: comparison view (Stock vs Current vs Target)

### Module 08 — Forgeworks Import
Accepts JSON export from Forgeworks. Adds crafted items to Ship Components' inventory with their material quality, ingredients, and any rolled stats.

### Module 09 — Codex (optional, low priority)
In-app documentation. Same pattern as Forgeworks Module 10.

---

## Data Model — localStorage Keys (draft)

Following Forgeworks' naming conventions:

| Key | Format | Purpose |
|---|---|---|
| `shipcomp-ships` | `Ship[]` | All known ships from API (reference data) |
| `shipcomp-hangar` | `{[shipId]: {status, acquired, notes}}` | Player's owned/pledged ships |
| `shipcomp-components` | `Component[]` | All known component types from API (reference data) |
| `shipcomp-loadouts` | `{[shipId]: {[slotId]: {stock, current, target}}}` | Per-ship loadout state |
| `shipcomp-inventory` | `InventoryItem[]` | Uninstalled components |
| `shipcomp-crafted-imports` | `CraftedItem[]` | Crafted items imported from Forgeworks |
| `shipcomp-sync-meta` | `{date, gameVersion, count}` | Last sync metadata |
| `shipcomp-sync-log` | `SyncEntry[]` | Sync history (up to 20) |

### Core schemas (draft — subject to API discovery)

**Ship**
```javascript
{
  id: number,
  uuid: string,
  name: string,                 // "Constellation Andromeda"
  manufacturer: string,         // "RSI"
  size_class: string,           // "Medium" | "Large" | etc.
  slots: [
    { id: "shield_1", type: "Shield", size: 2, count: 1 },
    { id: "powerplant_1", type: "PowerPlant", size: 3, count: 1 },
    // ...
  ],
  stock_loadout: {
    "shield_1": { component_ref: "uuid-..." },
    "powerplant_1": { component_ref: "uuid-..." },
    // ...
  }
}
```

**Component**
```javascript
{
  id: number,
  uuid: string,
  name: string,                 // "Sparkpack"
  type: string,                 // "Shield" | "PowerPlant" | "QuantumDrive" | "Cooler"
                                // | "Radar" | "MiningLaser" | "Refuel" | "Salvage"
                                // | "ShipWeapon" | "TractorBeam"
  class: string,                // "Military" | "Industrial" | "Stealth"
                                // | "Civilian" | "Competition"
  grade: string,                // "A" | "B" | "C" | "D"
  size: number,                 // 1 | 2 | 3
  meta: {
    // type-specific properties: power_draw, heat_dissipation, etc.
  }
}
```

**InventoryItem**
```javascript
{
  id: number,
  component_ref: string,        // UUID of component type
  source: string,               // "stock_removed" | "purchased" | "crafted_import" | "manual"
  crafted_item_ref: number|null, // If source = crafted_import, links to shipcomp-crafted-imports
  custom_stats: object|null,    // If manually entered, override values
  acquired_date: string,
  notes: string
}
```

**CraftedItem** (imported from Forgeworks)
```javascript
// Matches Forgeworks' export format from project_context.md
{
  id: number,
  uuid: string,
  base: string,                 // "Sparkpack"
  type: "ShipComponent",
  component_type: string,       // "Cooler"
  component_class: string,
  component_grade: string,
  component_size: number,
  ingredients: [{ name, qty }],
  meta: { /* rolled stats */ }
}
```

---

## Conventions (matching Forgeworks)

- Component type names follow Forgeworks' `ShipComponent` schema exactly (so imports are clean).
- UUIDs are stable keys across re-syncs; numeric IDs may change.
- Class values use the Forgeworks-defined set: Civilian, Military, Industrial, Stealth, Competition.
- Grade values: A, B, C, D (A best).
- Sizes: 1, 2, 3 (per user spec; some ships may use larger sizes — verify on API discovery).
- All page max-width: 1200px (matches Forgeworks).

---

## Open Questions

1. **Star Citizen Wiki API coverage for ships and components.** Forgeworks already uses `rest.star-citizen.wiki/api/v2/blueprints` for crafting. Need to identify the right endpoint(s) for:
   - Ship list with stock loadouts
   - Off-the-shelf (non-craftable) component reference data
2. **Pledged vs Owned ship distinction.** Is this a meaningful gameplay distinction in 4.8, or is it just a personal-tracking flag? Affects whether we model it as a status enum or just a free-text note.
3. **Component size range.** User spec says 1–3, but Forgeworks' component export uses size 0–4. Need to verify the actual game data.
4. **Reports module image generation.** Building a printable spec sheet — is this generated in-browser (HTML + canvas) or as an image download? Decide when we get there.
5. **Initial scope of Module 06 (Data Sync).** Whole hangar at once vs. incremental? Same UUID-bridge pattern as Forgeworks?

---

## Development & Implementation

### Color Palette (Implemented)

**Cool Blue Minimalist** — A sleek, professional sci-fi aesthetic with teal and blue accents.

CSS Variables (in `shipcomp-styles.css`):
```css
--sl-bg-deep: #0d1b2a;           /* Page background */
--sl-bg-panel: #1a2634;          /* Headers, panels */
--sl-bg-card: #242e3d;           /* Cards, inputs */
--sl-accent-primary: #00d9ff;    /* Cyan (main accent) */
--sl-accent-secondary: #0088cc;  /* Blue (secondary) */
--sl-text-primary: #e8f4f8;      /* Main text */
--sl-text-secondary: #9db4c1;    /* Supporting text */
--sl-status-success: #4caf50;    /* Success states */
--sl-status-warning: #ffb84d;    /* Warnings */
--sl-status-alert: #ff6b6b;      /* Errors */
```

All pages use these variables for consistency. No hardcoded colors.

### Development Environment

- **Editor:** Claude Code (desktop app)
- **Folder:** `D:\Support Files\ship-loadouts app\`
- **Tech Stack:** Vanilla HTML/CSS/JavaScript (no build step, no framework)
- **Persistence:** Browser localStorage only
- **Testing:** Direct file opening in Chrome/Edge (CORS-friendly for Wiki API)

### File Structure (as built)

```
ship-loadouts app/
├── shipcomp_dashboard.html       # Dashboard: Navigation hub + status cards ✅
├── shipcomp_datasync.html        # Data Sync: Wiki API sync (FULLY BUILT) ✅
├── shipcomp_hangar.html          # Hangar: Mark owned ships (stub)
├── shipcomp_loadouts.html        # Loadouts: Stock | Current | Target grid (stub)
├── shipcomp_inventory.html       # Inventory: Component management (stub)
├── shipcomp_itemsneeded.html     # Items Needed: Gap analysis (stub)
├── shipcomp_forgeworks.html      # Forgeworks Import: JSON import (stub)
├── shipcomp_reports.html         # Reports: Spec sheets (stub)
├── shipcomp_codex.html           # Codex: Documentation (stub)
├── shipcomp-styles.css           # Global styles ✅
├── shipcomp-utils.js             # Shared utilities ✅
└── README.md                     # Documentation ✅
```

### Data Sync Implementation (Completed)

The Data Sync page is fully functional and handles:

**API Integration:**
- Paginated ship fetching (50 per page, handles pagination automatically)
- Bulk component fetching by type (11 trackable types)
- Automatic game version detection from first ship response
- CORS-friendly (no special headers needed)

**User Experience:**
- Real-time progress bar (0–100%)
- Detailed sync log with timestamps and color-coded messages (info/success/error)
- Sync history (up to 20 most recent syncs)
- Status display (idle/syncing/success/error states)
- Start Sync and Clear Data buttons
- Auto-scrolling log view

**Data Flow:**
1. Fetch all ships with pagination → normalize → store in `shipcomp-ships`
2. Fetch each component type sequentially → normalize → aggregate → store in `shipcomp-components`
3. Extract game version from first ship
4. Set sync metadata (date, gameVersion, count)
5. Add entry to sync history log (keep last 20)

**Error Handling:**
- Try/catch wraps entire sync process
- Errors logged to UI with descriptive messages
- Sync status changes to "error" state on failure
- Buttons re-enable regardless of outcome

### Naming Conventions (Updated)

- **Pages** referred to by function name, not "Module XX"
  - ✅ "Data Sync" (not "Module 06")
  - ✅ "Hangar" (not "Module 02")
  - ✅ "Loadouts" (not "Module 03")

- **CSS variable prefix:** `--sl-` (Ship Loadouts)
- **localStorage keys:** `shipcomp-*` (ship components)
- **Component types:** Match Star Citizen Wiki API exactly (Shield, PowerPlant, QuantumDrive, Cooler, Radar, WeaponMining, TractorBeam, TowingBeam, WeaponGun, Refuel, Salvage)

### Testing Checklist

- [ ] Data Sync fetches ships and components without errors
- [ ] Progress bar updates smoothly (0–100%)
- [ ] Sync log displays timestamped entries
- [ ] Sync history persists across page reloads
- [ ] Data stored in localStorage under `shipcomp-*` keys
- [ ] Dashboard displays ship/component counts after sync
- [ ] Hangar page lists available ships from reference data
- [ ] Loadouts page shows Stock column populated from ship data
- [ ] Inventory page can add/remove components
- [ ] Items Needed calculates gap between Current and Target
- [ ] Forgeworks Import accepts JSON and adds crafted items
- [ ] Reports generates spec sheets
- [ ] All pages style consistently with Cool Blue Minimalist palette

---

## What's Out of Scope for v1

- Crafting itself (handled entirely by Forgeworks).
- Multi-user / shared hangar / org features.
- Real-time game integration (no Star Citizen API for live in-game state).
- Auto-updates from a server.
- Mobile / responsive design (Forgeworks targets 1920×1080; this app will too).

---

## Build Order

1. **Foundation:** folder structure, dashboard shell (Module 01), CSS variables imported from Forgeworks
2. **Data Sync (Module 06):** get ship + component reference data flowing into localStorage
3. **Hangar (Module 02):** mark ships as owned/pledged
4. **Loadouts (Module 03):** the Stock/Current/Target grid — the central feature
5. **Inventory (Module 04):** managing uninstalled components
6. **Items Needed (Module 05):** derived view from Loadouts data
7. **Forgeworks Import (Module 08):** add the bridge
8. **Reports (Module 07):** ship spec sheets
9. **Codex (Module 09):** if there's time

---

## For the Next Claude

- This app is a sibling to TI Forgeworks. Read its `project_context.md` first to understand conventions.
- We deliberately chose **no shared localStorage** — interop is via manual JSON import only.
- Match Forgeworks' look-and-feel exactly. CSS tokens, fonts, header patterns, button styles.
- Don't introduce a build step, framework, or backend. The whole point is "open an HTML file and it works."
- When the SC Wiki API for ship data is identified, update the Data Sync module to use it.
