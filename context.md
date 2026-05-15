# Project Context: Ship Loadouts App

**Last Updated:** 2026-05-15  
**Project Stage:** Core UI & Dashboard Complete; Ready for Loadouts Module

---

## Project Overview

A **Star Citizen 4.8 ship loadout tracker** for single-player use. Helps players manage which components are installed on each ship in their hangar, track what's in inventory, and see what they still need to acquire or craft.

**Core Concept:** Track three states per component slot per ship:
- **Stock** — what shipped with the ship (immutable reference)
- **Current** — what's installed right now
- **Target** — what the player wants installed (wishlist)

The gap between Current and Target drives the "Items Needed" view, which is the practical output.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vanilla HTML / CSS / JavaScript |
| **Backend** | None (100% client-side) |
| **Persistence** | Browser localStorage |
| **Data Source** | Star Citizen Wiki API + manual Forgeworks JSON import |
| **Distribution** | Zip file, shared via Discord/Drive |
| **Build** | None (open HTML directly) |

---

## Current Architecture

### File Structure
```
ship-loadouts app/
├── shipcomp_dashboard.html       ✅ Complete (status cards, navigation)
├── shipcomp_datasync.html        ✅ Complete (Wiki API sync)
├── shipcomp_hangar.html          ✅ Complete (add/edit/remove ships)
├── shipcomp_loadouts.html        🟡 Stub (next to build)
├── shipcomp_inventory.html       ❌ Disabled (for later)
├── shipcomp_itemsneeded.html     🟡 Stub
├── shipcomp_forgeworks.html      🟡 Stub
├── shipcomp_reports.html         🟡 Stub
├── shipcomp_codex.html           🟡 Stub
├── shipcomp-styles.css           ✅ Complete (Industrial palette)
├── shipcomp-utils.js             ✅ Complete (storage + API helpers)
├── header.png                    ✅ Logo banner
└── README.md                     ✅ User docs
```

### localStorage Keys
- `shipcomp-ships` — all ships from API (reference data)
- `shipcomp-hangar` — **array** of owned/pledged ships (with id, shipId, shipName, status, acquired, notes)
- `shipcomp-components` — all components from API (reference data)
- `shipcomp-loadouts` — `{shipId: {slotId: {stock, current, target}}}`
- `shipcomp-inventory` — uninstalled components (array)
- `shipcomp-crafted-imports` — items imported from Forgeworks (array)
- `shipcomp-sync-meta` — last sync metadata (date, gameVersion, count)
- `shipcomp-sync-log` — sync history (last 20 syncs)

**⚠️ Important:** Hangar data changed from object `{shipId: {...}}` to array `[{id, shipId, ...}]` to support multiple copies of the same ship. Migration function handles old data automatically.

---

## Color Palette: Industrial

**Overall Aesthetic:** Dark charcoal with bright orange accents and warm gold highlights.

| Token | Hex | Usage |
|---|---|---|
| `--sl-bg-deep` | #1a1a1a | Page background (Charcoal) |
| `--sl-bg-panel` | #2d2d2d | Headers, sidebars, panels (Dark Steel) |
| `--sl-bg-card` | #4a4a4a | Cards, inputs, table rows (Steel Grey) |
| `--sl-bg-hover` | #505050 | Hover states (Gun Metal) |
| `--sl-accent-primary` | #f0a040 | Primary accent (Bright Orange) |
| `--sl-accent-secondary` | #505050 | Secondary accent (Gun Metal) |
| `--sl-accent-bright` | #e8934a | Hover variant |
| `--sl-accent-dim` | #a85a28 | Disabled variant |
| `--sl-text-primary` | #f5f5f5 | Main text (Light Grey, 16px minimum) |
| `--sl-text-secondary` | #d0d0d0 | Supporting text |
| `--sl-text-dim` | #a8a8a8 | Labels, metadata |
| `--sl-status-warning` | #f0a040 | Pledged status (Orange) |
| `--sl-status-success` | #8fa876 | Online/complete (Green) |
| `--sl-status-alert` | #ff6b6b | Error/critical (Red) |

**Special Colors:**
- **Warm Gold** (#d4a574) — Used for "Pledged" badge (text, border, background tint)

---

## Layout & Typography

### Typography
- **Heading Font:** Rajdhani (monospace, title styling)
- **Data Font:** Share Tech Mono (monospace, table/technical data)
- **Body Font:** Exo 2 (sans-serif, general text)
- **Base Font Size:** 16px (enforced minimum across all pages)
- **Line Height:** 1.6

### Container & Spacing
- **Page Max Width:** 1200px
- **Container Alignment:** Left-justified (margin: 0) — pages sit under menu
- **Spacing Scale:** xs(4px), sm(8px), md(12px), lg(16px), xl(24px)
- **Border Radius:** 4px (default), 6px (large elements)

### Navigation
- **Logo Banner:** header.png, left-aligned, max 1200px × 150px
- **Menu Order:** Dashboard → Hangar → Loadouts → Items Needed → Forgeworks Import → Reports → **Data Sync** → Codex → Inventory (disabled, grayed out)
- **Active Link Color:** Bright orange (#f0a040)
- **Font Size:** 14px (nav links)

---

## Dashboard: Status Cards

**Current Layout (5 cards):**
1. **Ships in Hangar** — count of owned/pledged entries
2. **Total Hardpoints** — count of all trackable slots across all ships
3. **Stock Hardpoints** — count of unmodified slots (current === stock)
4. **Items Needed** — count of mismatches between current and target
5. **Data Version** — game version from last sync (font-size: 20px, smaller for long numbers)

---

## Hangar Page: Ship Management

### Features
- **Add Ships Modal:** 2-column layout
  - Left: Search bar, size/role filters, ship list (scrollable)
  - Right: Ship info, status dropdown (Procured/Pledged), notes input, Add button
- **Modal Behavior:** Stays open after adding a ship, resets form for bulk additions
- **Hangar List:** Displays all owned ships with status badge, acquisition date, notes, edit/remove buttons
- **De-duplication:** Only exact ship name matches count as duplicates (Cutlass Black vs. Cutlass Black - Red are different)
- **Status Badges:**
  - Procured: Green (badge-success)
  - Pledged: Warm gold (#d4a574) text/border, rgba(212, 165, 116, 0.25) background

---

## Data Sync: Wiki API Integration

**Endpoints Used:**
- `https://api.star-citizen.wiki/api/v2/vehicles` — Ship list (paginated, 50 per page)
- `https://api.star-citizen.wiki/api/v2/items?filter[type]={type}` — Components by type

**Trackable Component Types:**
Shield, PowerPlant, QuantumDrive, Cooler, Radar, WeaponMining, TractorBeam, TowingBeam, WeaponGun, Refuel, Salvage

**Process:**
1. Fetch all ships with pagination
2. Fetch each component type sequentially
3. Normalize and deduplicate data
4. Extract game version from first ship response
5. Store in localStorage, update sync log

**Error Handling:** Try/catch wraps entire process; errors logged to UI; sync status updates appropriately.

---

## User Preferences & Working Style

### Principles (from CLAUDE.md)
1. **Present a clear plan and wait for explicit confirmation** before writing code
2. **Show destructive actions and wait for confirmation** before executing
3. **Stop if scope grows** beyond original description
4. **Don't modify files outside scope** without explicit confirmation
5. **User has final authority** — never override instructions
6. **Display all 6 principles** at start of every response

### Communication Style
- **Terse responses** — no trailing summaries unless asked
- **Direct action** — when direction is clear, proceed without extra questions
- **Short updates** at key moments (found something, changed direction, hit blocker)
- **One sentence summaries** at the end of work
- **Show code changes** before committing (diffs in context)

### Design Decisions
- ✅ No frameworks, no build step — vanilla HTML/CSS/JS
- ✅ localStorage only — no server backend
- ✅ Separate from Forgeworks (manual JSON import bridge)
- ✅ Industrial aesthetic with sci-fi HUD feel (clipped buttons, monospace fonts)
- ✅ Left-justified pages (not centered)
- ✅ Minimum 14px font size (accessibility)
- ✅ Single-user, no auth, no multi-tenancy

---

## Build Order & Status

1. ✅ **Foundation:** Folder structure, styles, CSS variables
2. ✅ **Dashboard:** Status cards, navigation
3. ✅ **Data Sync:** Wiki API integration, sync history
4. ✅ **Hangar:** Add/edit/remove ships, modal interface
5. 🔜 **Loadouts:** Stock | Current | Target grid (NEXT)
6. 🔴 **Inventory:** Component management (disabled for now)
7. ⏳ **Items Needed:** Gap analysis view
8. ⏳ **Forgeworks Import:** JSON import
9. ⏳ **Reports:** Spec sheets, hangar summary
10. ⏳ **Codex:** In-app documentation

---

## Known Issues & Fixes Applied

| Issue | Root Cause | Fix |
|---|---|---|
| Ship list not showing in Hangar | Filter checking production_status === 'flight-ready' (only 3 ships matched) | Changed to !== 'concept' (288+ ships now show) |
| Duplicate ships in list | Multiple roles/variants with same name | Added de-duplication logic using Set |
| Modal double-scrolling | Poor layout, hard to see Status/Notes | Redesigned to 2-column layout; only ship list scrolls |
| Text too small/hard to read | Cool Blue palette had poor contrast; all fonts < 14px | Updated to Industrial palette + enforced 14px minimum |
| Hangar.map error on load | Old localStorage data was object, not array | Added migration function in getHangar() |

---

## Next Session Priorities

**Immediate (High Priority):**
1. Build **Loadouts** page — the core feature
   - For each ship: display all hardpoint slots
   - Show Stock | Current | Target columns (Stock is read-only)
   - Current and Target are dropdowns sourcing from inventory
   - Target can also link to crafted/custom specs
2. Test Loadouts against Ships with many hardpoints (verify slot extraction)
3. Build **Items Needed** page — derived view of Current → Target gaps

**Medium Priority:**
1. Build **Inventory** page — uninstalled components management
2. Wire up Forgeworks JSON import
3. Create Reports page skeleton

**Low Priority / Backlog:**
1. Codex (documentation)
2. Mobile responsiveness (currently targets 1920×1080)
3. Advanced features (comparisons, exports, etc.)

---

## File Locations

- **Main Project:** `D:\Support Files\ship-loadouts app\`
- **Worktree:** `D:\Support Files\ship-loadouts app\.claude\worktrees\youthful-shamir-4ab893`
- **Memory:** `C:\Users\mikel\.claude\projects\D--Support-Files-ship-loadouts-app\memory\`

---

## Useful References

- **Star Citizen Wiki API:** https://api.star-citizen.wiki/api/docs
- **Companion App:** TI Forgeworks (separate repo; uses same CSS/font strategy)
- **Distribution Method:** Zip file, 25MB Discord limit; manual version updates

