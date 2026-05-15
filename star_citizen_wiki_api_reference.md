# Star Citizen Wiki API Reference

**Date:** May 2026 (4.8.0 LIVE data)  
**API Base:** `https://api.star-citizen.wiki`  
**Authentication:** None required  
**Rate Limits:** None observed, but cache aggressively for bulk operations  

---

## Quick Start

The Star Citizen Wiki API provides current game data (ships, components, manufacturers) updated automatically from the Star Citizen game files. It's stable, requires no authentication, and returns 4.8 LIVE patch data.

**Key endpoints for ship loadout tracking:**
- Ships with stock loadouts: `GET /api/v2/vehicles/{slug}`
- Ship list/filter: `GET /api/vehicles?filter[name]=X`
- Components by type: `GET /api/items?filter[type]=Cooler`
- Single component detail: `GET /api/items/{uuid}`

---

## Endpoints

### Ships

#### Get single ship (full detail)
```
GET /api/v2/vehicles/{slug}
```

**Path parameter:**
- `slug` — URL-safe ship identifier, e.g. `300i`, `anvl-arrow`, `orig-300i`, `constellation-andromeda`

**Returns:** Full ship payload including all hardpoints, stock loadout, specs, and images.

**Example:**
```
GET https://api.star-citizen.wiki/api/v2/vehicles/300i
```

**Key fields in response:**
```javascript
{
  uuid: string,              // stable across re-syncs
  name: string,              // "300i"
  game_name: string,         // "Origin 300i"
  slug: string,              // "orig-300i"
  class_name: string,        // "ORIG_300i" (game internal)
  manufacturer: {
    name: string,            // "Origin Jumpworks"
    code: string,            // "ORIG"
    uuid: string
  },
  career: string,            // "Combat" | "Industry" | "Exploration" | etc.
  role: string,              // "Light Fighter" | "Heavy Freight" | "Explorer" | etc.
  size_class: number,        // 0-4 (0=ground, 4=capital)
  msrp: number|null,         // USD pledge price
  pledge_url: string|null,   // direct RSI store link
  production_status: string, // "flight-ready" | "concept" | etc.
  version: string,           // "4.8.0-LIVE.11825000" (game version)
  images: [                  // ship photos
    { thumbnail_url, original_url, original_width, ... }
  ],
  hardpoints: [              // every component slot
    {
      name: string,          // "hardpoint_cooler_left"
      type: string,          // component type
      min_size: number,
      max_size: number,
      item: {                // stock-equipped component
        uuid: string,
        name: string,
        class_name: string,
        type: string,
        size: number,
        grade: string,
        class: string,
        manufacturer: { ... }
      }
    }
  ],
  relay_network: {           // alternative structure, categorized
    relays: [
      {
        connected_hardpoints: [
          {
            category: string, // "Power Plants", "Coolers", "Shields", etc.
            items: [ /* stock components */ ]
          }
        ]
      }
    ]
  }
}
```

---

#### List/filter ships
```
GET /api/vehicles?filter[name]=X
```

**Query parameters:**
- `filter[name]=X` — filter by ship name (substring match)
- Supports pagination (details TBD, but large lists work)

**Returns:** Array of ship objects (same structure as single ship endpoint, but full payloads).

**Example:**
```
GET https://api.star-citizen.wiki/api/vehicles?filter[name]=Constellation
GET https://api.star-citizen.wiki/api/vehicles?filter[name]=Arrow
```

**Note:** Returns *full* ship detail by default, not a slim summary. Plan accordingly for bulk fetches.

---

### Components

#### Get single component (full detail)
```
GET /api/items/{uuid}
```

**Path parameter:**
- `uuid` — component UUID from a ship's hardpoint response

**Returns:** Full component payload with stats, description, manufacturer, and type-specific data.

**Key fields in response:**
```javascript
{
  uuid: string,
  name: string,              // "ArcticStorm"
  class_name: string,        // "COOL_LPLT_S01_ArcticStorm_SCItem"
  type: string,              // component type (see table below)
  size: number,              // 0-4
  grade: string,             // "A" | "B" | "C" | "D"
  class: string,             // "Civilian" | "Military" | "Industrial" | "Stealth" | "Competition"
  manufacturer: {
    name: string,
    code: string,
    uuid: string
  },
  is_craftable: boolean,     // 4.8 crafting flag
  mass: number,              // kg
  description: {
    en_EN: string,           // English description
    de_DE: string,           // German translation
    zh_CN: string            // Chinese translation
  },
  version: string,           // game version when last updated
  // type-specific nested objects (depending on component type):
  cooler: { cooling_rate, suppression, ... },
  shield: { hp, regeneration, ... },
  power_plant: { power_generation, ... },
  // etc.
}
```

---

#### List/filter components by type
```
GET /api/items?filter[type]=Cooler
```

**Query parameters:**
- `filter[type]=X` — filter by component type (exact match)

**Returns:** Array of component objects matching the type.

**Example:**
```
GET https://api.star-citizen.wiki/api/items?filter[type]=Cooler
GET https://api.star-citizen.wiki/api/items?filter[type]=Shield
GET https://api.star-citizen.wiki/api/items?filter[type]=PowerPlant
GET https://api.star-citizen.wiki/api/items?filter[type]=QuantumDrive
GET https://api.star-citizen.wiki/api/items?filter[type]=Radar
GET https://api.star-citizen.wiki/api/items?filter[type]=WeaponMining
GET https://api.star-citizen.wiki/api/items?filter[type]=WeaponGun
GET https://api.star-citizen.wiki/api/items?filter[type]=TractorBeam
GET https://api.star-citizen.wiki/api/items?filter[type]=TowingBeam
```

**Note:** Returns *full* component detail by default. Bulk fetches of all component types can be done with one request per type.

---

### Manufacturers

#### Get manufacturer detail
```
GET /api/manufacturers/{code}
```

**Path parameter:**
- `code` — manufacturer code, e.g. `ORIG`, `ANVL`, `AEG`, `RSI`

**Returns:** Manufacturer info (optional — ship and component payloads already include manufacturer subset).

---

## Component Types (API `type` Values)

Use these exact strings when filtering by component type:

| Display Label | API `type` Value | Notes |
|---|---|---|
| Shield | `Shield` | Shield generator |
| Power Plant | `PowerPlant` | Power generation |
| Quantum Drive | `QuantumDrive` | FTL drive |
| Cooler | `Cooler` | Heat dissipation |
| Radar | `Radar` | Detection |
| Mining Laser | `WeaponMining` | Mining head |
| Salvage | *(TBC)* | Salvage head — likely `SalvageHead` or similar |
| Tractor Beam | `TractorBeam` | Small/medium tractor |
| Towing Beam | `TowingBeam` | Larger tractor (capital ships) |
| Ship Weapon | `WeaponGun` | Ballistic / energy weapon |
| Refuel | *(TBC)* | Refueling probe — likely `Refuel` or similar |

**Note:** The API returns many more types (thrusters, controllers, doors, paints, seats, etc.) but these are the "trackable" types for ship loadout management. Filter to these when populating inventory/loadout views.

---

## Data Quality Notes

### Stock Loadouts
Every ship response includes its stock-equipped components in two nested structures:
1. **`hardpoints[]`** — flat array with full detail
2. **`relay_network.relays[].connected_hardpoints[]`** — categorized by component type

Both contain the same data; choose whichever structure suits your parser. The stock loadout is **immutable** — use it as a reference, not editable state.

### Component Variants
Ships like Constellation have multiple variants (Andromeda, Aquila, Phoenix, Taurus). Each is a separate API record with its own slug and stock loadout. Plan your Hangar UI to handle "I own a Constellation, but which one?" — likely show all variants in the ship picker.

### Size Range
Components and hardpoints support size **0-4 inclusive**:
- **0:** Ground vehicles / very small items
- **1-3:** Standard ship components
- **4:** Capital ship components (large power plants, shields, etc.)

### Grades and Classes
**Grades:** A (best), B, C, D (standard craft output)  
**Classes:** Civilian, Military, Industrial, Stealth, Competition (some components only have some classes)

### Caching Strategy
The API data updates when game patches drop. For bulk operations:
1. Store all ships and components in localStorage on first sync
2. Re-sync only when: player initiates "Refresh", or a new game version is detected
3. Use the `version` field from API responses to detect game patches

---

## Response Format

All responses follow this structure:

**Successful request:**
```javascript
{
  data: [ /* array of objects */ ] or { /* single object */ }
}
```

**Error (if any):**
```javascript
{
  error: string,
  message: string
}
```

HTTP status codes are standard (200 OK, 404 Not Found, etc.).

---

## CORS and Browser Usage

✅ **CORS-friendly** — tested and works from browser-based apps (no special headers needed).  
✅ **No authentication** — no API key or OAuth required.  
✅ **No rate limiting observed** — but cache responses and be respectful.

---

## Examples

### Get a ship and extract stock loadout
```javascript
const shipResponse = await fetch('https://api.star-citizen.wiki/api/v2/vehicles/300i');
const ship = (await shipResponse.json()).data;

const stockLoadout = ship.hardpoints
  .filter(hp => hp.type !== 'Seat' && hp.type !== 'Paint') // filter out non-trackable
  .map(hp => ({
    hardpoint: hp.name,
    type: hp.type,
    stock_component_uuid: hp.item?.uuid,
    stock_component_name: hp.item?.name,
    stock_component_size: hp.item?.size,
    stock_component_grade: hp.item?.grade
  }));
```

### Get all coolers
```javascript
const coolersResponse = await fetch('https://api.star-citizen.wiki/api/items?filter[type]=Cooler');
const coolers = (await coolersResponse.json()).data;

coolers.forEach(cooler => {
  console.log(`${cooler.name} - Size ${cooler.size}, Grade ${cooler.grade}, Class ${cooler.class}`);
});
```

### Check if a component is craftable (4.8)
```javascript
const componentResponse = await fetch('https://api.star-citizen.wiki/api/items/d98450a2-605a-47b6-a8cd-f43df14ddf0e');
const component = (await componentResponse.json()).data;

if (component.is_craftable) {
  console.log(`${component.name} can be crafted in 4.8`);
}
```

---

## Known Limitations & TBD

1. **Salvage and Refuel component types:** API `type` values not yet confirmed. Likely `SalvageHead` and `Refuel`, but worth verifying in a test call.
2. **Variant ship handling:** No built-in API method to group Constellation variants—each is a separate record. Plan your UI accordingly.
3. **Pagination:** Exact pagination parameters not documented here. For bulk ship/component fetches, may need to explore `page`, `per_page`, or cursor-based approaches.
4. **Search:** Name-based filtering (`filter[name]`) works but may be case-sensitive or have other quirks—test with exact names from the wiki.

---

## For Ship-Loadouts App Specifically

**Recommended data sync strategy:**
1. On first launch, bulk-fetch all trackable component types (10 API calls, one per type)
2. Bulk-fetch all ships using the list endpoint with pagination
3. Cache everything in localStorage with `version` field
4. On subsequent launches, check if game version has changed; if so, re-sync
5. Let player manually trigger "Refresh" if they want fresh data mid-session

**Storage estimate:**
- ~400 ships × ~20 trackable hardpoints = ~8,000 hardpoint records
- ~2,000 unique components across all types
- Compressed JSON: ~5-10 MB

This fits comfortably in localStorage (most browsers allow 5-10 MB per origin) and loads in <1 second.

---

## Resources

- **API Docs (interactive):** https://docs.star-citizen.wiki/
- **API GitHub:** https://github.com/StarCitizenWiki/API
- **Swagger/OpenAPI:** https://docs.star-citizen.wiki/ (has interactive examples)
- **Wiki:** https://star-citizen.wiki (human-readable reference)

---

*Document created May 2026 for Star Citizen 4.8 LIVE patch. Update if API changes or new endpoints are discovered.*
