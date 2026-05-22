/**
 * Ship Loadouts App — Shared Utilities
 * API calls, localStorage helpers, data validation
 */

// ============================================
// CONSTANTS
// ============================================

const TRACKABLE_TYPES = [
  'PowerPlant',
  'QuantumDrive',
  'Shield',
  'Cooler',
  'Radar',
  'TractorBeam',
  'MiningLaser',
  'Refuelling',
  'SalvageModifier',
  'Turret',
  'MissileLauncher',
  'WeaponDefensive',
  'WeaponGun',
  'Missile'
];

// ============================================
// LOCALSTORAGE HELPERS
// ============================================

const ShipCompStorage = {
  // Initialize empty structures if they don't exist
  init() {
    if (!localStorage.getItem('shipcomp-ships')) {
      localStorage.setItem('shipcomp-ships', JSON.stringify([]));
    }
    if (!localStorage.getItem('shipcomp-components')) {
      localStorage.setItem('shipcomp-components', JSON.stringify([]));
    }
    if (!localStorage.getItem('shipcomp-hangar')) {
      localStorage.setItem('shipcomp-hangar', JSON.stringify({}));
    }
    if (!localStorage.getItem('shipcomp-loadouts')) {
      localStorage.setItem('shipcomp-loadouts', JSON.stringify({}));
    }
    if (!localStorage.getItem('shipcomp-crafted-items')) {
      localStorage.setItem('shipcomp-crafted-items', JSON.stringify([]));
    }
    if (!localStorage.getItem('shipcomp-sync-meta')) {
      localStorage.setItem('shipcomp-sync-meta', JSON.stringify({}));
    }
    if (!localStorage.getItem('shipcomp-sync-log')) {
      localStorage.setItem('shipcomp-sync-log', JSON.stringify([]));
    }
  },

  // Get all ships (reference data from API)
  getShips() {
    return JSON.parse(localStorage.getItem('shipcomp-ships') || '[]');
  },

  // Set all ships
  setShips(ships) {
    localStorage.setItem('shipcomp-ships', JSON.stringify(ships));
    this.dispatchChange('ships');
  },

  // Get all components (reference data from API)
  getComponents() {
    return JSON.parse(localStorage.getItem('shipcomp-components') || '[]');
  },

  // Set all components
  setComponents(components) {
    localStorage.setItem('shipcomp-components', JSON.stringify(components));
    this.dispatchChange('components');
  },

  // Get hangar (array of ship entries, supports multiple of same ship)
  getHangar() {
    const data = JSON.parse(localStorage.getItem('shipcomp-hangar') || '[]');
    // Handle migration from old object format to array format
    if (data && !Array.isArray(data)) {
      const migrated = [];
      for (const shipId in data) {
        const entry = data[shipId];
        migrated.push({
          id: Date.now() + Math.random(),
          shipId: parseInt(shipId),
          shipName: entry.shipName || 'Unknown Ship',
          status: entry.status || 'Procured',
          acquired: entry.acquired || new Date().toISOString().split('T')[0],
          notes: entry.notes || ''
        });
      }
      this.setHangarArray(migrated);
      return migrated;
    }
    return data;
  },

  // Internal: set hangar directly as array (used for migration)
  setHangarArray(hangar) {
    localStorage.setItem('shipcomp-hangar', JSON.stringify(hangar));
  },

  // Add ship to hangar
  addShipToHangar(shipId, shipName, status = 'Procured', notes = '') {
    const hangar = this.getHangar();
    const entry = {
      id: Date.now(), // Unique ID for this hangar entry
      shipId: shipId,
      shipName: shipName,
      status: status, // 'Procured' or 'Pledged'
      acquired: new Date().toISOString().split('T')[0],
      notes: notes
    };
    hangar.push(entry);
    localStorage.setItem('shipcomp-hangar', JSON.stringify(hangar));
    this.dispatchChange('hangar');
    return entry;
  },

  // Remove ship from hangar by entry ID
  removeHangarEntry(entryId) {
    const hangar = this.getHangar();
    const filtered = hangar.filter(entry => entry.id !== entryId);
    localStorage.setItem('shipcomp-hangar', JSON.stringify(filtered));
    this.dispatchChange('hangar');
  },

  // Update hangar entry (status, notes)
  updateHangarEntry(entryId, status, notes) {
    const hangar = this.getHangar();
    const entry = hangar.find(e => e.id === entryId);
    if (entry) {
      entry.status = status;
      entry.notes = notes;
      localStorage.setItem('shipcomp-hangar', JSON.stringify(hangar));
      this.dispatchChange('hangar');
    }
    return entry;
  },

  // Get loadouts (Stock | Current | Target per ship)
  getLoadouts() {
    return JSON.parse(localStorage.getItem('shipcomp-loadouts') || '{}');
  },

  // Set loadout for a specific slot on a ship
  setLoadoutSlot(shipId, slotId, stock, current, target) {
    const loadouts = this.getLoadouts();
    if (!loadouts[shipId]) {
      loadouts[shipId] = {};
    }
    loadouts[shipId][slotId] = {
      stock: stock,    // component UUID
      current: current, // component UUID or null
      target: target    // component UUID or null
    };
    localStorage.setItem('shipcomp-loadouts', JSON.stringify(loadouts));
    this.dispatchChange('loadouts');
    return loadouts[shipId][slotId];
  },

  // Get crafted items
  getCraftedItems() {
    return JSON.parse(localStorage.getItem('shipcomp-crafted-items') || '[]');
  },

  // Add crafted item (from import)
  addCraftedItem(craftedItem) {
    const items = this.getCraftedItems();
    const item = {
      id: Date.now(),
      name: craftedItem.name,
      type: craftedItem.type,
      size: craftedItem.size,
      class: craftedItem.class,
      grade: craftedItem.grade,
      qualities: craftedItem.ingredientQualities,
      imported_date: new Date().toISOString().split('T')[0]
    };
    items.push(item);
    localStorage.setItem('shipcomp-crafted-items', JSON.stringify(items));
    this.dispatchChange('crafted-items');
    return item;
  },

  // Remove crafted item
  removeCraftedItem(itemId) {
    const items = this.getCraftedItems();
    const filtered = items.filter(item => item.id !== itemId);
    localStorage.setItem('shipcomp-crafted-items', JSON.stringify(filtered));
    this.dispatchChange('crafted-items');
  },

  // Get sync metadata
  getSyncMeta() {
    return JSON.parse(localStorage.getItem('shipcomp-sync-meta') || '{}');
  },

  // Set sync metadata (called after Data Sync completes)
  setSyncMeta(gameVersion, count = 0) {
    const meta = {
      date: new Date().toISOString(),
      gameVersion: gameVersion,
      count: count
    };
    localStorage.setItem('shipcomp-sync-meta', JSON.stringify(meta));
    
    // Add to sync log
    const log = JSON.parse(localStorage.getItem('shipcomp-sync-log') || '[]');
    log.push({
      date: meta.date,
      gameVersion: gameVersion,
      count: count
    });
    // Keep only last 20 entries
    if (log.length > 20) {
      log.shift();
    }
    localStorage.setItem('shipcomp-sync-log', JSON.stringify(log));
    
    this.dispatchChange('sync-meta');
  },

  // Dispatch custom event when data changes (for cross-module updates)
  dispatchChange(key) {
    const event = new CustomEvent('shipcomp-data-change', { detail: { key } });
    window.dispatchEvent(event);
  },

  // Clear all data (for reset)
  clear() {
    localStorage.removeItem('shipcomp-ships');
    localStorage.removeItem('shipcomp-components');
    localStorage.removeItem('shipcomp-hangar');
    localStorage.removeItem('shipcomp-loadouts');
    localStorage.removeItem('shipcomp-crafted-items');
    localStorage.removeItem('shipcomp-sync-meta');
    localStorage.removeItem('shipcomp-sync-log');
    this.init();
    this.dispatchChange('all');
  }
};

// ============================================
// STAR CITIZEN WIKI API
// ============================================

const WikiAPI = {
  BASE_URL: 'https://api.star-citizen.wiki/api',

  // Fetch a single ship by slug
  async getShip(slug) {
    try {
      const response = await fetch(`${this.BASE_URL}/v2/vehicles/${slug}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Failed to fetch ship ${slug}:`, error);
      return null;
    }
  },

  // Fetch all ships (paginated)
  async getAllShips(page = 1, perPage = 50) {
    try {
      const response = await fetch(`${this.BASE_URL}/vehicles?page=${page}&per_page=${perPage}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Failed to fetch ships:', error);
      return [];
    }
  },

  // Fetch components by type
  async getComponentsByType(type) {
    try {
      const response = await fetch(`${this.BASE_URL}/items?filter[type]=${type}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error(`Failed to fetch components of type ${type}:`, error);
      return [];
    }
  },

  // Fetch a single component by UUID
  async getComponent(uuid) {
    try {
      const response = await fetch(`${this.BASE_URL}/items/${uuid}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Failed to fetch component ${uuid}:`, error);
      return null;
    }
  }
};

// ============================================
// DATA PARSING & HELPERS
// ============================================

const DataHelpers = {
  // Extract stock loadout from a ship response
  extractStockLoadout(ship) {
    const stock = {};
    if (!ship.hardpoints) return stock;

    ship.hardpoints.forEach(hardpoint => {
      // Only include trackable component types
      if (!hardpoint.item || !TRACKABLE_TYPES.includes(hardpoint.type)) {
        return;
      }

      // Exclude secondary/backup hardpoints (e.g., _cab_, _secondary variants)
      if (hardpoint.name.includes('_cab_')) {
        return;
      }

      stock[hardpoint.name] = {
        component_uuid: hardpoint.item.uuid,
        component_name: hardpoint.item.name,
        type: hardpoint.type,
        size: hardpoint.item.size,
        grade: hardpoint.item.grade,
        class: hardpoint.item.class
      };
    });

    return stock;
  },

  // Extract weapon loadout from a ship response
  extractWeaponLoadout(ship) {
    const weapons = {};
    if (!ship.hardpoints) return weapons;

    const weaponTypes = ['Turret', 'MissileLauncher'];

    ship.hardpoints.forEach(hardpoint => {
      // Only include turrets and missile racks (skip countermeasures)
      if (!hardpoint.item || !weaponTypes.includes(hardpoint.type)) {
        return;
      }

      let stockWeapon = null;
      let turretWeaponType = null;

      // For Turrets: stock weapon is the first gun or missile in children
      if (hardpoint.type === 'Turret') {
        if (hardpoint.children && hardpoint.children.length > 0) {
          const firstChild = hardpoint.children[0];
          if (firstChild.item) {
            turretWeaponType = firstChild.type;
            stockWeapon = {
              uuid: firstChild.item.uuid,
              name: firstChild.item.name,
              type: firstChild.type,
              size: firstChild.item.size,
              sub_type: firstChild.sub_type
            };
          }
        }
      }

      // For MissileLauncher: stock weapon is the rack itself (the mount)
      if (hardpoint.type === 'MissileLauncher') {
        stockWeapon = {
          uuid: hardpoint.item.uuid,
          name: hardpoint.item.name,
          type: hardpoint.type,
          size: hardpoint.item.size,
          sub_type: hardpoint.sub_type
        };
      }

      weapons[hardpoint.name] = {
        mount_uuid: hardpoint.item.uuid,
        mount_name: hardpoint.item.name,
        mount_type: hardpoint.type,
        mount_sub_type: hardpoint.sub_type,
        mount_size: hardpoint.item.size,
        turret_weapon_type: turretWeaponType,
        stock_weapon: stockWeapon
      };
    });

    return weapons;
  },

  // Parse component response into normalized format
  normalizeComponent(apiComponent) {
    return {
      id: apiComponent.id,
      uuid: apiComponent.uuid,
      name: apiComponent.name,
      type: apiComponent.type,
      size: apiComponent.size,
      grade: apiComponent.grade || 'A',
      class: apiComponent.class,
      manufacturer: apiComponent.manufacturer?.name || 'Unknown',
      is_craftable: apiComponent.is_craftable || false,
      version: apiComponent.version
    };
  },

  // Parse ship response into normalized format
  normalizeShip(apiShip) {
    const thumbnail = apiShip.images?.[0]?.thumbnail_url || null;
    return {
      id: apiShip.id,
      uuid: apiShip.uuid,
      name: apiShip.name,
      game_name: apiShip.game_name,
      slug: apiShip.slug,
      manufacturer: apiShip.manufacturer?.name || 'Unknown',
      size_class: apiShip.size_class,
      career: apiShip.career,
      role: apiShip.role,
      production_status: apiShip.production_status,
      stock_loadout: this.extractStockLoadout(apiShip),
      stock_weapons_loadout: this.extractWeaponLoadout(apiShip),
      version: apiShip.version,
      thumbnail_url: thumbnail
    };
  },

  // Get component name from UUID
  getComponentName(componentUuid) {
    const components = ShipCompStorage.getComponents();
    const component = components.find(c => c.uuid === componentUuid);
    return component ? component.name : 'Unknown Component';
  },

  // Get ship name from ID
  getShipName(shipId) {
    const ships = ShipCompStorage.getShips();
    const ship = ships.find(s => s.id === shipId);
    return ship ? ship.name : 'Unknown Ship';
  },

  // Calculate items needed (gap between Current and Target)
  calculateItemsNeeded() {
    const loadouts = ShipCompStorage.getLoadouts();
    const needed = {};

    for (const shipId in loadouts) {
      const shipLoadout = loadouts[shipId];
      for (const slotId in shipLoadout) {
        const slot = shipLoadout[slotId];
        if (slot.target && slot.current !== slot.target) {
          const uuid = slot.target;
          if (!needed[uuid]) {
            needed[uuid] = {
              uuid: uuid,
              name: this.getComponentName(uuid),
              quantity: 0,
              slots: []
            };
          }
          needed[uuid].quantity += 1;
          needed[uuid].slots.push({ shipId, slotId });
        }
      }
    }

    return Object.values(needed);
  },

  // Get effect labels for a component type
  getEffectLabels(type) {
    const effectMap = {
      'PowerPlant': ['Integrity', 'Power Pips', 'Power Pips'],
      'Shield': ['Integrity', 'Max Shield Strength', 'Max Shield Strength'],
      'QuantumDrive': ['Integrity', 'Quantum Speed', 'Quantum Fuel Burn'],
      'Cooler': ['Integrity', 'Coolant Rating', 'Coolant Rating'],
      'Radar': ['Integrity', 'Min. Assist Distance', 'Max Assistance Distance'],
      'MiningLaser': ['Integrity', 'Laser Power', 'Laser Power'],
      'Refuel': ['Integrity'],
      'Salvage': ['Efficiency/Radius/Speed', 'Radius/Speed', 'Radius/Speed'],
      'TractorBeam': ['Integrity/Distance', 'Beam Force', 'Volume'],
      'WeaponGun': ['Integrity', 'Impact Force', 'Impact Force']
    };

    // Try exact match first
    if (effectMap[type]) return effectMap[type];

    // Try case-insensitive match
    for (const key in effectMap) {
      if (key.toLowerCase() === type.toLowerCase()) {
        return effectMap[key];
      }
    }

    return ['Effect 1', 'Effect 2', 'Effect 3'];
  }
};

// ============================================
// INITIALIZATION
// ============================================

// Auto-initialize on script load
ShipCompStorage.init();
