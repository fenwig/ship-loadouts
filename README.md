# Ship Loadouts App — Folder Structure

## Quick Start

1. Open `shipcomp_dashboard.html` in Chrome or Edge
2. Go to **Data Sync** to pull ship and component reference data
3. Go to **Hangar** to mark which ships you own
4. Go to **Loadouts** to set your target components per ship
5. Go to **Items Needed** to see your shopping/crafting list

---

## Folder Structure

```
shipcomp-app/
├── shipcomp_dashboard.html        # Dashboard: Navigation hub + status cards
├── shipcomp_datasync.html         # Data Sync: Wiki API sync
├── shipcomp_hangar.html           # Hangar: Your ships (Owned / Pledged)
├── shipcomp_loadouts.html         # Loadouts: Stock | Current | Target grid
├── shipcomp_inventory.html        # Inventory: Uninstalled components
├── shipcomp_itemsneeded.html      # Items Needed: Gap analysis / shopping list
├── shipcomp_forgeworks.html       # Forgeworks Import: JSON import from Forgeworks
├── shipcomp_reports.html          # Reports: Ship spec sheets
├── shipcomp_codex.html            # Codex: In-app documentation
├── shipcomp-styles.css            # Global styles (Cool Blue Minimalist palette)
├── shipcomp-utils.js              # Shared utilities (localStorage, API calls)
└── README.md                       # This file
```

---

## localStorage Keys (Data Model)

All data persists in browser localStorage under these keys:

| Key | Format | Purpose |
|---|---|---|
| `shipcomp-ships` | `Ship[]` | All known ships from Wiki API (reference data) |
| `shipcomp-components` | `Component[]` | All trackable components from Wiki API (reference data) |
| `shipcomp-hangar` | `{[shipId]: {status, acquired, notes}}` | Player's owned/pledged ships |
| `shipcomp-loadouts` | `{[shipId]: {[slotId]: {stock, current, target}}}` | Per-ship Stock/Current/Target state |
| `shipcomp-inventory` | `InventoryItem[]` | Uninstalled components (purchased + imported) |
| `shipcomp-crafted-imports` | `CraftedItem[]` | Items imported from Forgeworks JSON |
| `shipcomp-sync-meta` | `{date, gameVersion, count}` | Last sync metadata |
| `shipcomp-sync-log` | `SyncEntry[]` | Sync history (up to 20 entries) |

---

## Core Data Schemas

### Ship
```javascript
{
  id: number,
  uuid: string,
  name: string,                    // "Constellation Andromeda"
  game_name: string,               // "Constellation Andromeda" (from API)
  slug: string,                    // "constellation-andromeda"
  manufacturer: string,            // "RSI"
  size_class: number,              // 0–4
  career: string,                  // "Combat", "Industry", etc.
  role: string,                    // "Light Fighter", "Heavy Freight", etc.
  stock_loadout: {
    "hardpoint_shield_1": { component_uuid: "...", name: "...", size: 2 },
    // ... per hardpoint
  },
  version: string                  // Game version when last synced (e.g., "4.8.0-LIVE.11825000")
}
```

### Component
```javascript
{
  id: number,
  uuid: string,
  name: string,                    // "ArcticStorm"
  type: string,                    // "Cooler", "Shield", "PowerPlant", etc.
  size: number,                    // 0–4
  grade: string,                   // "A", "B", "C", "D"
  class: string,                   // "Civilian", "Military", "Industrial", "Stealth", "Competition"
  manufacturer: string,            // "Juno"
  is_craftable: boolean,           // 4.8 flag
  version: string                  // Game version when last synced
}
```

### InventoryItem
```javascript
{
  id: number,                      // Internal ID
  component_uuid: string,          // UUID of component type
  source: string,                  // "stock_removed", "purchased", "crafted_import", "manual"
  crafted_item_id: number|null,    // Links to shipcomp-crafted-imports if source = "crafted_import"
  quantity: number,                // How many of this component
  acquired_date: string,           // "YYYY-MM-DD"
  notes: string,                   // User notes
  custom_stats: object|null        // If manually overriding properties
}
```

### CraftedItem (from Forgeworks import)
```javascript
{
  id: number,
  uuid: string,
  base: string,                    // "Sparkpack"
  type: "ShipComponent",
  component_type: string,          // "Cooler", "Shield", etc.
  component_class: string,         // "Military", "Industrial", etc.
  component_grade: string,         // "A", "B", "C", "D"
  component_size: number,          // 0–4
  ingredients: [{ name, qty }, ...], // Material requirements
  meta: { power_draw, heat_dissipation, ... } // Type-specific stats
}
```

---

## Build Order

1. **Dashboard** ✅ (this file, navigation + status cards)
2. **Data Sync** (API → localStorage)
3. **Hangar** (mark owned ships)
4. **Loadouts** (Stock | Current | Target grid)
5. **Inventory** (CRUD uninstalled components)
6. **Items Needed** (derived gap analysis)
7. **Forgeworks Import** (JSON bridge)
8. **Reports** (ship spec sheets)
9. **Codex** (documentation)

---

## API Endpoints (Star Citizen Wiki)

**Base:** `https://api.star-citizen.wiki`

### Ships
- `GET /api/v2/vehicles/{slug}` — Single ship with hardpoints and stock loadout
- `GET /api/vehicles?filter[name]=X` — List/filter ships

### Components
- `GET /api/items?filter[type]=Cooler` — List components by type (one per trackable type)
- `GET /api/items/{uuid}` — Single component detail

**Trackable component types:**
Shield, PowerPlant, QuantumDrive, Cooler, Radar, WeaponMining, TractorBeam, TowingBeam, WeaponGun, Refuel, Salvage

---

## Design System — Cool Blue Minimalist

### Colors (CSS variables)
- `--sl-bg-deep` (#0d1b2a) — Page background
- `--sl-bg-panel` (#1a2634) — Headers, panels
- `--sl-bg-card` (#242e3d) — Cards, inputs
- `--sl-accent-primary` (#00d9ff) — Cyan (main accent)
- `--sl-accent-secondary` (#0088cc) — Blue (secondary)
- `--sl-text-primary` (#e8f4f8) — Main text
- `--sl-text-secondary` (#9db4c1) — Supporting text
- `--sl-status-success` (#4caf50), `-warning` (#ffb84d), `-alert` (#ff6b6b)

### Typography
- **Titles:** Rajdhani (bold, 20–28px)
- **Data/monospace:** Share Tech Mono (10–15px)
- **Body text:** Exo 2 (14–16px)

### Components
- **Buttons:** Clipped polygon corners, outlined by default, filled primary variants
- **Form inputs:** Dark backgrounds, cyan focus states
- **Badges:** Inline with colored borders, uppercase
- **Tables:** Data-heavy layouts with monospace values

---

## localStorage Browser Limits

Most browsers allow **5–10 MB** per origin.

**Storage estimate for full data:**
- ~400 ships × 20 slots = 8,000 hardpoint records ≈ 2 MB
- ~2,000 components ≈ 1.5 MB
- User hangar + loadouts + inventory ≈ 100 KB
- **Total: ~4 MB (comfortable fit)**

---

## Development Notes

- **No build step.** All files are served directly — just open `.html` files in a browser.
- **No framework.** Vanilla HTML/CSS/JavaScript only.
- **No backend.** 100% client-side via localStorage.
- **CORS-friendly.** Star Citizen Wiki API works from browser without special headers.
- **Manual distribution.** Zip the folder, share via Discord or Google Drive.

---

## Troubleshooting

**localStorage is cleared by user:**
All modules re-initialize gracefully to empty state. Re-run Data Sync to restore reference data.

**API not reachable:**
Check browser console (F12) for fetch errors. Verify network connection. Star Citizen Wiki API is very stable.

**Modules not loading:**
Ensure all `.html` files are in the same folder as `shipcomp_dashboard.html`. Iframes expect relative paths.

---

## For the Next Claude

- Read the **ship_components_app_design.md** for the full specification
- Check **star_citizen_wiki_api_reference.md** for API details
- Review **crafting_project_context.md** for Forgeworks integration specs
- This app is a sibling to TI Forgeworks — visual consistency via CSS variables is important
- No shared localStorage between apps — interop is **manual JSON import only**

---

*Ship Loadouts App — Star Citizen 4.8 Component Tracker*  
*Status: Foundation built, pages pending*
