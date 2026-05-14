# Ship Loadouts App

A Star Citizen 4.8 ship loadout tracker. Tracks what's installed on each ship in your hangar, what's in your inventory, and what you still need to acquire.

**Status:** Design phase — not yet functional.

---

## What It Does

For each ship you own, track three states per component slot:

- **Stock** — what the ship came with from the factory
- **Current** — what's installed right now
- **Target** — what you want installed (your wishlist)

The gap between *Current* and *Target* generates an "Items Needed" list — your shopping/crafting roadmap.

## How to Run It

Once built: open `shipcomp_dashboard.html` in Chrome or Edge. No server, no install, no dependencies.

## Modules (planned)

1. Dashboard — navigation hub
2. Hangar — your owned and pledged ships
3. Loadouts — the Stock/Current/Target grid (core feature)
4. Inventory — uninstalled components
5. Items Needed — derived shopping/crafting list
6. Data Sync — pulls reference data from the SC Wiki API
7. Reports — ship spec sheets
8. Forgeworks Import — bring in crafted components via JSON
9. Codex — in-app documentation

## Companion to TI Forgeworks

This app pairs with [TI Forgeworks](https://github.com/fenwig/Forgeworks), a Star Citizen crafting tracker. If you craft ship components in Forgeworks, you can export them as JSON and import them here as inventory. Both apps work fine standalone.

## Tech Stack

Vanilla HTML / CSS / JavaScript. Browser localStorage for persistence. No build step, no framework, no backend.

## Design

See [`ship_components_app_design.md`](./ship_components_app_design.md) for the full design document, data model, and decisions log.

---

*Personal project. Not affiliated with Cloud Imperium Games or Roberts Space Industries.*
