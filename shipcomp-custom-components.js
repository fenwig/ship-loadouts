/**
 * Ship Loadouts App — Custom Component Data
 * Complete component lists by type and size
 * Merges with Wiki API data to capture new components
 */

const CUSTOM_COMPONENTS = {
  'PowerPlant': {
    0: [
      { name: 'Defiant', size: 0, class: 'Industrial', grade: 'B', manufacturer: 'Juno Starwerk' },
      { name: 'DuraJet', size: 0, class: 'Civilian', grade: 'D', manufacturer: 'Lightning Power Ltd.' },
      { name: 'IonWave', size: 0, class: 'Civilian', grade: 'B', manufacturer: 'Lightning Power Ltd.' },
      { name: 'Jennet', size: 0, class: 'Industrial', grade: 'D', manufacturer: 'Juno Starwerk' },
      { name: 'Radix', size: 0, class: 'Civilian', grade: 'C', manufacturer: 'Lightning Power Ltd.' },
      { name: 'Steadfast', size: 0, class: 'Industrial', grade: 'C', manufacturer: 'Juno Starwerk' }
    ],
    1: [
      { name: 'Breton', size: 1, class: 'Industrial', grade: 'A', manufacturer: 'Juno Starwerk' },
      { name: 'Charger', size: 1, class: 'Military', grade: 'D', manufacturer: 'Aegis Dynamics' },
      { name: 'DeltaMax', size: 1, class: 'Stealth', grade: 'B', manufacturer: 'Tyler Design & Tech' },
      { name: 'DynaFlux', size: 1, class: 'Military', grade: 'B', manufacturer: 'Amon & Reese Co.' },
      { name: 'Endurance', size: 1, class: 'Industrial', grade: 'B', manufacturer: 'Juno Starwerk' },
      { name: 'Fierell Cascade', size: 1, class: 'Military', grade: 'B', manufacturer: 'Aegis Dynamics' },
      { name: 'Fortitude', size: 1, class: 'Industrial', grade: 'C', manufacturer: 'Juno Starwerk' },
      { name: 'HyperGen', size: 1, class: 'Military', grade: 'D', manufacturer: 'Amon & Reese Co.' },
      { name: 'IonBurst', size: 1, class: 'Civilian', grade: 'B', manufacturer: 'Lightning Power Ltd.' },
      { name: 'JS-300', size: 1, class: 'Military', grade: 'A', manufacturer: 'Amon & Reese Co.' },
      { name: 'LightBlossom', size: 1, class: 'Civilian', grade: 'C', manufacturer: 'Sakura Sun' },
      { name: 'LumaCore', size: 1, class: 'Competition', grade: 'A', manufacturer: 'ACOM' },
      { name: 'MagnaBloom', size: 1, class: 'Civilian', grade: 'B', manufacturer: 'Sakura Sun' },
      { name: 'OverDrive', size: 1, class: 'Military', grade: 'C', manufacturer: 'Amon & Reese Co.' },
      { name: 'PowerBolt', size: 1, class: 'Civilian', grade: 'C', manufacturer: 'Lightning Power Ltd.' },
      { name: 'QuadraCell', size: 1, class: 'Military', grade: 'A', manufacturer: 'Aegis Dynamics' },
      { name: 'Regulus', size: 1, class: 'Military', grade: 'C', manufacturer: 'Aegis Dynamics' },
      { name: 'Roughneck', size: 1, class: 'Industrial', grade: 'D', manufacturer: 'Juno Starwerk' },
      { name: 'Slipstream', size: 1, class: 'Stealth', grade: 'A', manufacturer: 'Tyler Design & Tech' },
      { name: 'SonicLite', size: 1, class: 'Stealth', grade: 'C', manufacturer: 'Tyler Design & Tech' },
      { name: 'StarHeart', size: 1, class: 'Competition', grade: 'B', manufacturer: 'ACOM' },
      { name: 'SunFlare', size: 1, class: 'Competition', grade: 'C', manufacturer: 'ACOM' },
      { name: 'WhiteRose', size: 1, class: 'Civilian', grade: 'A', manufacturer: 'Sakura Sun' },
      { name: 'ZapJet', size: 1, class: 'Civilian', grade: 'D', manufacturer: 'Lightning Power Ltd.' }
    ],
    2: [
      { name: 'Bolide', size: 2, class: 'Military', grade: 'B', manufacturer: 'Aegis Dynamics' },
      { name: 'Cirrus', size: 2, class: 'Stealth', grade: 'C', manufacturer: 'Tyler Design & Tech' },
      { name: 'DayBreak', size: 2, class: 'Civilian', grade: 'C', manufacturer: 'Sakura Sun' },
      { name: 'Diligence', size: 2, class: 'Industrial', grade: 'C', manufacturer: 'Juno Starwerk' },
      { name: 'ExoGen', size: 2, class: 'Military', grade: 'D', manufacturer: 'Amon & Reese Co.' },
      { name: 'FullForce', size: 2, class: 'Civilian', grade: 'C', manufacturer: 'Lightning Power Ltd.' },
      { name: 'GammaMax', size: 2, class: 'Stealth', grade: 'B', manufacturer: 'Tyler Design & Tech' },
      { name: 'Genoa', size: 2, class: 'Industrial', grade: 'A', manufacturer: 'Juno Starwerk' },
      { name: 'IonSurge', size: 2, class: 'Civilian', grade: 'B', manufacturer: 'Lightning Power Ltd.' },
      { name: 'JS-400', size: 2, class: 'Military', grade: 'A', manufacturer: 'Amon & Reese Co.' },
      { name: 'Lotus', size: 2, class: 'Civilian', grade: 'A', manufacturer: 'Sakura Sun' },
      { name: 'LuxCore', size: 2, class: 'Competition', grade: 'A', manufacturer: 'ACOM' },
      { name: 'Maelstrom', size: 2, class: 'Military', grade: 'C', manufacturer: 'Aegis Dynamics' },
      { name: 'QuadraCell MT', size: 2, class: 'Military', grade: 'A', manufacturer: 'Aegis Dynamics' },
      { name: 'Radiance', size: 2, class: 'Civilian', grade: 'B', manufacturer: 'Sakura Sun' },
      { name: 'Sedulity', size: 2, class: 'Industrial', grade: 'B', manufacturer: 'Juno Starwerk' },
      { name: 'SolarFlare', size: 2, class: 'Competition', grade: 'C', manufacturer: 'ACOM' },
      { name: 'SparkJet', size: 2, class: 'Civilian', grade: 'D', manufacturer: 'Lightning Power Ltd.' },
      { name: 'StarBurn', size: 2, class: 'Competition', grade: 'B', manufacturer: 'ACOM' },
      { name: 'Trommel', size: 2, class: 'Industrial', grade: 'D', manufacturer: 'Juno Starwerk' },
      { name: 'TurboDrive', size: 2, class: 'Military', grade: 'C', manufacturer: 'Amon & Reese Co.' },
      { name: 'UltraFlux', size: 2, class: 'Military', grade: 'B', manufacturer: 'Amon & Reese Co.' },
      { name: 'Vortex', size: 2, class: 'Military', grade: 'D', manufacturer: 'Aegis Dynamics' }
    ],
    3: [
      { name: 'Celestial', size: 3, class: 'Civilian', grade: 'B', manufacturer: 'Sakura Sun' },
      { name: 'Drassik', size: 3, class: 'Military', grade: 'D', manufacturer: 'Aegis Dynamics' },
      { name: 'Durango', size: 3, class: 'Industrial', grade: 'A', manufacturer: 'Juno Starwerk' },
      { name: 'Fulgur', size: 3, class: 'Military', grade: 'B', manufacturer: 'Aegis Dynamics' },
      { name: 'FullForce Pro', size: 3, class: 'Civilian', grade: 'C', manufacturer: 'Lightning Power Ltd.' },
      { name: 'Ginzel', size: 3, class: 'Industrial', grade: 'C', manufacturer: 'Juno Starwerk' },
      { name: 'IonSurge Pro', size: 3, class: 'Civilian', grade: 'B', manufacturer: 'Lightning Power Ltd.' },
      { name: 'JS-500', size: 3, class: 'Military', grade: 'A', manufacturer: 'Amon & Reese Co.' },
      { name: 'MegaFlux', size: 3, class: 'Military', grade: 'B', manufacturer: 'Amon & Reese Co.' },
      { name: 'NewDawn', size: 3, class: 'Civilian', grade: 'C', manufacturer: 'Sakura Sun' },
      { name: 'QuadraCell MX', size: 3, class: 'Military', grade: 'A', manufacturer: 'Aegis Dynamics' },
      { name: 'Reliance', size: 3, class: 'Industrial', grade: 'B', manufacturer: 'Juno Starwerk' },
      { name: 'SmartGen', size: 3, class: 'Military', grade: 'D', manufacturer: 'Amon & Reese Co.' },
      { name: 'SparkJet Pro', size: 3, class: 'Civilian', grade: 'D', manufacturer: 'Lightning Power Ltd.' },
      { name: 'SuperDrive', size: 3, class: 'Military', grade: 'C', manufacturer: 'Amon & Reese Co.' },
      { name: 'TigerLilly', size: 3, class: 'Civilian', grade: 'A', manufacturer: 'Sakura Sun' }
    ],
    4: [
      { name: 'Main Powerplant', size: 4, class: null, grade: 'A', manufacturer: 'Aegis Dynamics' },
      { name: 'Mauler Power Plant', size: 4, class: null, grade: 'A', manufacturer: 'VNC' },
      { name: 'Stellate', size: 4, class: 'Civilian', grade: 'A', manufacturer: 'Sakura Sun' }
    ]
  },
  'Cooler': {
    0: [
      { name: 'Cryo-Star SL', size: 0, class: 'Civilian', grade: 'B', manufacturer: 'J-Span' },
      { name: 'Fridan', size: 0, class: 'Civilian', grade: 'C', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'Frost-Star SL', size: 0, class: 'Civilian', grade: 'C', manufacturer: 'J-Span' },
      { name: 'Kelvid', size: 0, class: 'Civilian', grade: 'B', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'Tepilo', size: 0, class: 'Civilian', grade: 'A', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'Winter-Star SL', size: 0, class: 'Civilian', grade: 'D', manufacturer: 'J-Span' }
    ],
    1: [
      { name: 'ArcticStorm', size: 1, class: 'Civilian', grade: 'C', manufacturer: 'Lightning Power Ltd.' },
      { name: 'Berian', size: 1, class: 'Civilian', grade: 'C', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'BlastChill', size: 1, class: 'Civilian', grade: 'D', manufacturer: 'Lightning Power Ltd.' },
      { name: 'Bracer', size: 1, class: 'Military', grade: 'C', manufacturer: 'Aegis Dynamics' },
      { name: 'Cryo-Star', size: 1, class: 'Civilian', grade: 'B', manufacturer: 'J-Span' },
      { name: 'Eco-Flow', size: 1, class: 'Industrial', grade: 'B', manufacturer: 'Juno Starwerk' },
      { name: 'Endo', size: 1, class: 'Civilian', grade: 'B', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'FlashFreeze', size: 1, class: 'Civilian', grade: 'B', manufacturer: 'Lightning Power Ltd.' },
      { name: 'Frost-Star', size: 1, class: 'Civilian', grade: 'C', manufacturer: 'J-Span' },
      { name: 'Gelid', size: 1, class: 'Civilian', grade: 'A', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'Glacier', size: 1, class: 'Military', grade: 'A', manufacturer: 'Aegis Dynamics' },
      { name: 'HeatSafe', size: 1, class: 'Stealth', grade: 'C', manufacturer: 'Tyler Design & Tech' },
      { name: 'Hydrocel', size: 1, class: 'Industrial', grade: 'D', manufacturer: 'Juno Starwerk' },
      { name: 'IcePlunge', size: 1, class: 'Competition', grade: 'C', manufacturer: 'ACOM' },
      { name: 'Polar', size: 1, class: 'Military', grade: 'B', manufacturer: 'Aegis Dynamics' },
      { name: 'QuikCool', size: 1, class: 'Competition', grade: 'D', manufacturer: 'ACOM' },
      { name: 'SnowBlind', size: 1, class: 'Stealth', grade: 'A', manufacturer: 'Tyler Design & Tech' },
      { name: 'Thermax', size: 1, class: 'Industrial', grade: 'C', manufacturer: 'Juno Starwerk' },
      { name: 'Tundra', size: 1, class: 'Military', grade: 'D', manufacturer: 'Aegis Dynamics' },
      { name: 'Ultra-Flow', size: 1, class: 'Industrial', grade: 'A', manufacturer: 'Juno Starwerk' },
      { name: 'VaporBlock', size: 1, class: 'Stealth', grade: 'B', manufacturer: 'Tyler Design & Tech' },
      { name: 'Winter-Star', size: 1, class: 'Civilian', grade: 'D', manufacturer: 'J-Span' },
      { name: 'ZeroRush', size: 1, class: 'Competition', grade: 'B', manufacturer: 'ACOM' }
    ],
    2: [
      { name: 'AbsoluteZero', size: 2, class: 'Competition', grade: 'B', manufacturer: 'ACOM' },
      { name: 'Arctic', size: 2, class: 'Military', grade: 'C', manufacturer: 'Aegis Dynamics' },
      { name: 'Aufeis', size: 2, class: 'Civilian', grade: 'A', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'Avalanche', size: 2, class: 'Military', grade: 'A', manufacturer: 'Aegis Dynamics' },
      { name: 'Boreal', size: 2, class: 'Military', grade: 'D', manufacturer: 'Aegis Dynamics' },
      { name: 'ColdSnap', size: 2, class: 'Civilian', grade: 'C', manufacturer: 'Lightning Power Ltd.' },
      { name: 'CoolCore', size: 2, class: 'Industrial', grade: 'C', manufacturer: 'Juno Starwerk' },
      { name: 'Cryo-Star EX', size: 2, class: 'Civilian', grade: 'B', manufacturer: 'J-Span' },
      { name: 'Frost-Star EX', size: 2, class: 'Civilian', grade: 'C', manufacturer: 'J-Span' },
      { name: 'FullFrost', size: 2, class: 'Civilian', grade: 'B', manufacturer: 'Lightning Power Ltd.' },
      { name: 'Graupel', size: 2, class: 'Civilian', grade: 'C', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'HeatSink', size: 2, class: 'Stealth', grade: 'C', manufacturer: 'Tyler Design & Tech' },
      { name: 'HydroJet', size: 2, class: 'Industrial', grade: 'D', manufacturer: 'Juno Starwerk' },
      { name: 'IceBox', size: 2, class: 'Stealth', grade: 'B', manufacturer: 'Tyler Design & Tech' },
      { name: 'IceDive', size: 2, class: 'Competition', grade: 'C', manufacturer: 'ACOM' },
      { name: 'NightFall', size: 2, class: 'Stealth', grade: 'A', manufacturer: 'Tyler Design & Tech' },
      { name: 'Permafrost', size: 2, class: 'Military', grade: 'B', manufacturer: 'Aegis Dynamics' },
      { name: 'RapidCool', size: 2, class: 'Competition', grade: 'D', manufacturer: 'ACOM' },
      { name: 'Snowfall', size: 2, class: 'Industrial', grade: 'B', manufacturer: 'Juno Starwerk' },
      { name: 'Snowpack', size: 2, class: 'Industrial', grade: 'A', manufacturer: 'Juno Starwerk' },
      { name: 'Taiga', size: 2, class: 'Civilian', grade: 'B', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'WhiteOut', size: 2, class: 'Civilian', grade: 'D', manufacturer: 'Lightning Power Ltd.' },
      { name: 'Winter-Star EX', size: 2, class: 'Civilian', grade: 'D', manufacturer: 'J-Span' }
    ],
    3: [
      { name: 'Blizzard', size: 3, class: 'Military', grade: 'A', manufacturer: 'Aegis Dynamics' },
      { name: 'Chill-Max', size: 3, class: 'Industrial', grade: 'A', manufacturer: 'Juno Starwerk' },
      { name: 'ColdSurge', size: 3, class: 'Civilian', grade: 'D', manufacturer: 'Lightning Power Ltd.' },
      { name: 'Cryo-Star XL', size: 3, class: 'Civilian', grade: 'B', manufacturer: 'J-Span' },
      { name: 'Draug', size: 3, class: 'Civilian', grade: 'A', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'Elsen', size: 3, class: 'Civilian', grade: 'A', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'Frost-Star XL', size: 3, class: 'Civilian', grade: 'C', manufacturer: 'J-Span' },
      { name: 'FrostBite', size: 3, class: 'Civilian', grade: 'B', manufacturer: 'Lightning Power Ltd.' },
      { name: 'FrostBurn', size: 3, class: 'Civilian', grade: 'C', manufacturer: 'Lightning Power Ltd.' },
      { name: 'Galinstan', size: 3, class: 'Military', grade: 'D', manufacturer: 'Aegis Dynamics' },
      { name: 'Hydropulse', size: 3, class: 'Industrial', grade: 'D', manufacturer: 'Juno Starwerk' },
      { name: 'Ice-Flush', size: 3, class: 'Industrial', grade: 'B', manufacturer: 'Juno Starwerk' },
      { name: 'Kragen', size: 3, class: 'Civilian', grade: 'A', manufacturer: 'Wen-Cassel Propulsion' },
      { name: 'Mercury', size: 3, class: 'Military', grade: 'C', manufacturer: 'Aegis Dynamics' },
      { name: 'Tempest', size: 3, class: 'Military', grade: 'B', manufacturer: 'Aegis Dynamics' },
      { name: 'ThermalCore', size: 3, class: 'Industrial', grade: 'C', manufacturer: 'Juno Starwerk' },
      { name: 'Winter-Star XL', size: 3, class: 'Civilian', grade: 'D', manufacturer: 'J-Span' }
    ],
    4: [
      { name: 'Algid', size: 4, class: 'Industrial', grade: 'A', manufacturer: 'Aegis Dynamics' },
      { name: 'Exotherm', size: 4, class: null, grade: 'A', manufacturer: 'Unknown manufacturer' },
      { name: 'Mauler Cooler', size: 4, class: null, grade: 'A', manufacturer: 'Vanduul Clans' },
      { name: 'Serac', size: 4, class: 'Civilian', grade: 'A', manufacturer: 'Wen-Cassel Propulsion' }
    ]
  },
  'Shield': {
    0: [
      { name: 'Castra (shield generator)', size: 0, class: 'Industrial', grade: 'C', manufacturer: 'Basilisk' },
      { name: 'PIN', size: 0, class: 'Civilian', grade: 'C', manufacturer: 'Seal Corporation' }
    ],
    1: [
      { name: "5SA 'Rhada'", size: 1, class: 'Civilian', grade: 'C', manufacturer: 'Behring Applied Technology' },
      { name: "6SA 'Arbiter'", size: 1, class: 'Civilian', grade: 'B', manufacturer: 'Behring Applied Technology' },
      { name: "7SA 'Concord'", size: 1, class: 'Civilian', grade: 'A', manufacturer: 'Behring Applied Technology' },
      { name: 'AllStop', size: 1, class: 'Military', grade: 'C', manufacturer: 'Gorgon Defender Industries' },
      { name: 'Bulwark', size: 1, class: 'Industrial', grade: 'C', manufacturer: 'Basilisk' },
      { name: 'Cloak', size: 1, class: 'Stealth', grade: 'D', manufacturer: 'Ascension Astro' },
      { name: 'FR-66', size: 1, class: 'Military', grade: 'A', manufacturer: 'Gorgon Defender Industries' },
      { name: 'Falco', size: 1, class: 'Competition', grade: 'D', manufacturer: 'Yorm' },
      { name: 'ForceWall', size: 1, class: 'Military', grade: 'B', manufacturer: 'Gorgon Defender Industries' },
      { name: 'Guardian', size: 1, class: 'Industrial', grade: 'B', manufacturer: 'Basilisk' },
      { name: 'HEX', size: 1, class: 'Civilian', grade: 'B', manufacturer: 'Seal Corporation' },
      { name: 'INK', size: 1, class: 'Civilian', grade: 'D', manufacturer: 'Seal Corporation' },
      { name: 'Jaghte', size: 1, class: 'Competition', grade: 'B', manufacturer: 'Yorm' },
      { name: 'Mirage', size: 1, class: 'Stealth', grade: 'A', manufacturer: 'Ascension Astro' },
      { name: 'Palisade', size: 1, class: 'Industrial', grade: 'A', manufacturer: 'Basilisk' },
      { name: 'SecureHyde', size: 1, class: 'Military', grade: 'D', manufacturer: 'Gorgon Defender Industries' },
      { name: 'Shimmer', size: 1, class: 'Stealth', grade: 'C', manufacturer: 'Ascension Astro' },
      { name: 'Steward', size: 1, class: 'Industrial', grade: 'D', manufacturer: 'Basilisk' },
      { name: 'Suldrath', size: 1, class: 'Military', grade: 'C', manufacturer: 'Banu Souli' },
      { name: 'Targa', size: 1, class: 'Competition', grade: 'C', manufacturer: 'Yorm' },
      { name: 'Veil', size: 1, class: 'Stealth', grade: 'B', manufacturer: 'Ascension Astro' },
      { name: 'WEB', size: 1, class: 'Civilian', grade: 'C', manufacturer: 'Seal Corporation' }
    ],
    2: [
      { name: "5MA 'Chimalli'", size: 2, class: 'Civilian', grade: 'C', manufacturer: 'Behring Applied Technology' },
      { name: "6MA 'Kozane'", size: 2, class: 'Civilian', grade: 'B', manufacturer: 'Behring Applied Technology' },
      { name: "7MA 'Lorica'", size: 2, class: 'Civilian', grade: 'A', manufacturer: 'Behring Applied Technology' },
      { name: 'Armada', size: 2, class: 'Industrial', grade: 'D', manufacturer: 'Basilisk' },
      { name: 'Aspis', size: 2, class: 'Industrial', grade: 'C', manufacturer: 'Basilisk' },
      { name: 'BLOC', size: 2, class: 'Civilian', grade: 'B', manufacturer: 'Seal Corporation' },
      { name: 'Bamoty', size: 2, class: 'Competition', grade: 'D', manufacturer: 'Yorm' },
      { name: 'Citadel (shield generator)', size: 2, class: 'Industrial', grade: 'B', manufacturer: 'Basilisk' },
      { name: 'CoverAll', size: 2, class: 'Military', grade: 'B', manufacturer: 'Gorgon Defender Industries' },
      { name: 'FR-76', size: 2, class: 'Military', grade: 'A', manufacturer: 'Gorgon Defender Industries' },
      { name: 'FullStop', size: 2, class: 'Military', grade: 'C', manufacturer: 'Gorgon Defender Industries' },
      { name: 'Haltur', size: 2, class: 'Competition', grade: 'B', manufacturer: 'Yorm' },
      { name: 'Obscura', size: 2, class: 'Stealth', grade: 'C', manufacturer: 'Ascension Astro' },
      { name: 'RPEL', size: 2, class: 'Civilian', grade: 'D', manufacturer: 'Seal Corporation' },
      { name: 'Rampart', size: 2, class: 'Industrial', grade: 'A', manufacturer: 'Basilisk' },
      { name: 'STOP', size: 2, class: 'Civilian', grade: 'C', manufacturer: 'Seal Corporation' },
      { name: 'SecureShield', size: 2, class: 'Military', grade: 'D', manufacturer: 'Gorgon Defender Industries' },
      { name: 'Sheut', size: 2, class: 'Stealth', grade: 'B', manufacturer: 'Ascension Astro' },
      { name: 'Shroud', size: 2, class: 'Stealth', grade: 'D', manufacturer: 'Ascension Astro' },
      { name: 'Sukoran', size: 2, class: 'Military', grade: 'C', manufacturer: 'Banu Souli' },
      { name: 'Trenta', size: 2, class: 'Competition', grade: 'C', manufacturer: 'Yorm' },
      { name: 'Umbra', size: 2, class: 'Stealth', grade: 'A', manufacturer: 'Ascension Astro' }
    ],
    3: [
      { name: "5CA 'Akura'", size: 3, class: 'Civilian', grade: 'C', manufacturer: 'Behring Applied Technology' },
      { name: "6CA 'Bila'", size: 3, class: 'Civilian', grade: 'B', manufacturer: 'Behring Applied Technology' },
      { name: "7CA 'Nargun'", size: 3, class: 'Civilian', grade: 'A', manufacturer: 'Behring Applied Technology' },
      { name: 'ARMOR', size: 3, class: 'Civilian', grade: 'B', manufacturer: 'Seal Corporation' },
      { name: 'Barbican', size: 3, class: 'Industrial', grade: 'B', manufacturer: 'Basilisk' },
      { name: 'FR-86', size: 3, class: 'Military', grade: 'A', manufacturer: 'Gorgon Defender Industries' },
      { name: 'FullBlock', size: 3, class: 'Military', grade: 'B', manufacturer: 'Gorgon Defender Industries' },
      { name: 'GUARD', size: 3, class: 'Civilian', grade: 'C', manufacturer: 'Seal Corporation' },
      { name: 'HAVEN', size: 3, class: 'Civilian', grade: 'D', manufacturer: 'Seal Corporation' },
      { name: 'Parapet', size: 3, class: 'Industrial', grade: 'A', manufacturer: 'Basilisk' },
      { name: 'SecureScreen', size: 3, class: 'Military', grade: 'D', manufacturer: 'Gorgon Defender Industries' },
      { name: 'Stronghold', size: 3, class: 'Industrial', grade: 'C', manufacturer: 'Basilisk' },
      { name: 'SureStop', size: 3, class: 'Military', grade: 'C', manufacturer: 'Gorgon Defender Industries' },
      { name: 'Ward', size: 3, class: 'Industrial', grade: 'D', manufacturer: 'Basilisk' }
    ],
    4: [
      { name: 'Glacis', size: 4, class: 'Industrial', grade: 'A', manufacturer: 'Basilisk' },
      { name: 'Holdstrong', size: 4, class: null, grade: 'A', manufacturer: 'Gorgon Defender Industries' },
      { name: 'Mauler Shield Generator', size: 4, class: null, grade: 'A', manufacturer: 'Gorgon Defender Industries' },
      { name: 'RS-Barrier', size: 4, class: 'Industrial', grade: 'A', manufacturer: 'Aegis Dynamics' }
    ]
  },
  'Radar': {
    0: [
      { name: 'Agure', size: 0, class: 'Military', grade: 'D', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'BroadSpec-Go', size: 0, class: 'Industrial', grade: 'B', manufacturer: 'Chimera Communications' },
      { name: 'Denning', size: 0, class: 'Civilian', grade: 'C', manufacturer: 'WillsOp' },
      { name: 'Fabian', size: 0, class: 'Civilian', grade: 'A', manufacturer: 'WillsOp' },
      { name: 'FullSpec-Go', size: 0, class: 'Industrial', grade: 'A', manufacturer: 'Chimera Communications' },
      { name: 'Observer-Go', size: 0, class: 'Industrial', grade: 'D', manufacturer: 'Chimera Communications' },
      { name: 'Prevenir', size: 0, class: 'Military', grade: 'C', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'Sens', size: 0, class: 'Military', grade: 'B', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'Surveyor-Go', size: 0, class: 'Industrial', grade: 'C', manufacturer: 'Chimera Communications' },
      { name: 'V60-26', size: 0, class: 'Military', grade: 'A', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'Vogel', size: 0, class: 'Civilian', grade: 'B', manufacturer: 'WillsOp' }
    ],
    1: [
      { name: 'Abetti', size: 1, class: 'Civilian', grade: 'A', manufacturer: 'WillsOp' },
      { name: 'Backlund', size: 1, class: 'Civilian', grade: 'B', manufacturer: 'WillsOp' },
      { name: 'Capston', size: 1, class: 'Civilian', grade: 'C', manufacturer: 'WillsOp' },
      { name: 'Ecouter', size: 1, class: 'Military', grade: 'C', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'Fleming', size: 1, class: 'Civilian', grade: 'D', manufacturer: 'WillsOp' },
      { name: 'Observer-Lite', size: 1, class: 'Industrial', grade: 'D', manufacturer: 'Chimera Communications' },
      { name: 'Pelerous', size: 1, class: 'Stealth', grade: 'A', manufacturer: 'Blue Triangle Inc.' },
      { name: 'Prophet', size: 1, class: 'Stealth', grade: 'A', manufacturer: 'Blue Triangle Inc.' },
      { name: 'SNS-R6', size: 1, class: 'Competition', grade: 'C', manufacturer: 'Nav-E7 Gadgets' },
      { name: 'SNSR5', size: 1, class: 'Competition', grade: 'D', manufacturer: 'Nav-E7 Gadgets' },
      { name: 'SNSR7', size: 1, class: 'Competition', grade: 'B', manufacturer: 'Nav-E7 Gadgets' },
      { name: 'Surveyor-Lite', size: 1, class: 'Industrial', grade: 'C', manufacturer: 'Chimera Communications' },
      { name: 'Tige', size: 1, class: 'Military', grade: 'B', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'V801-11', size: 1, class: 'Military', grade: 'A', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'Voir', size: 1, class: 'Military', grade: 'D', manufacturer: 'Groupe Nouveau Paradigme' }
    ],
    2: [
      { name: 'Agrippa', size: 2, class: 'Civilian', grade: 'A', manufacturer: 'WillsOp' },
      { name: 'Battani', size: 2, class: 'Civilian', grade: 'B', manufacturer: 'WillsOp' },
      { name: 'Broadspec-Lite', size: 2, class: 'Industrial', grade: 'B', manufacturer: 'Chimera Communications' },
      { name: 'Cassandra', size: 2, class: 'Stealth', grade: 'A', manufacturer: 'Blue Triangle Inc.' },
      { name: 'Chernykh', size: 2, class: 'Civilian', grade: 'C', manufacturer: 'WillsOp' },
      { name: 'Epier', size: 2, class: 'Military', grade: 'C', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'Fawad', size: 2, class: 'Civilian', grade: 'D', manufacturer: 'WillsOp' },
      { name: 'FullSpec', size: 2, class: 'Industrial', grade: 'A', manufacturer: 'Chimera Communications' },
      { name: 'Mauler Radar', size: 2, class: null, grade: 'B', manufacturer: 'Vanduul Clans' },
      { name: 'Observer', size: 2, class: 'Industrial', grade: 'D', manufacturer: 'Chimera Communications' },
      { name: 'Predator', size: 2, class: 'Stealth', grade: 'B', manufacturer: 'Blue Triangle Inc.' },
      { name: 'SNS-R5x', size: 2, class: 'Competition', grade: 'D', manufacturer: 'Nav-E7 Gadgets' },
      { name: 'SNS-R6x', size: 2, class: 'Competition', grade: 'C', manufacturer: 'Nav-E7 Gadgets' },
      { name: 'SNS-R7x', size: 2, class: 'Competition', grade: 'B', manufacturer: 'Nav-E7 Gadgets' },
      { name: 'Savoir', size: 2, class: 'Military', grade: 'D', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'Spyglass', size: 2, class: 'Stealth', grade: 'C', manufacturer: 'Blue Triangle Inc.' },
      { name: 'Surveyor', size: 2, class: 'Industrial', grade: 'C', manufacturer: 'Chimera Communications' },
      { name: 'V801-12', size: 2, class: 'Military', grade: 'A', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'Vigilance', size: 2, class: 'Military', grade: 'B', manufacturer: 'Groupe Nouveau Paradigme' }
    ],
    3: [
      { name: 'Anysta', size: 3, class: 'Civilian', grade: 'A', manufacturer: 'WillsOp' },
      { name: 'BroadSpec', size: 3, class: 'Industrial', grade: 'B', manufacturer: 'Chimera Communications' },
      { name: 'Capsulo', size: 3, class: 'Civilian', grade: 'B', manufacturer: 'WillsOp' },
      { name: 'Devoue', size: 3, class: 'Military', grade: 'B', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'Fidele', size: 3, class: 'Military', grade: 'D', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'FullSpec-Max', size: 3, class: 'Industrial', grade: 'A', manufacturer: 'Chimera Communications' },
      { name: 'Lephari', size: 3, class: null, grade: 'C', manufacturer: 'WillsOp' },
      { name: 'Observer-Max', size: 3, class: 'Industrial', grade: 'D', manufacturer: 'Chimera Communications' },
      { name: 'Resolu', size: 3, class: 'Military', grade: 'C', manufacturer: 'Groupe Nouveau Paradigme' },
      { name: 'Socoria', size: 3, class: 'Civilian', grade: 'D', manufacturer: 'WillsOp' },
      { name: 'Surveyor-Max', size: 3, class: 'Industrial', grade: 'C', manufacturer: 'Chimera Communications' },
      { name: 'V880', size: 3, class: 'Military', grade: 'A', manufacturer: 'Groupe Nouveau Paradigme' }
    ],
    4: [
      { name: 'BroadSpec-Max', size: 4, class: 'Industrial', grade: 'B', manufacturer: 'Chimera Communications' }
    ]
  },
  'QuantumDrive': {
    1: [
      { name: 'Atlas', size: 1, class: 'Civilian', grade: 'A', manufacturer: 'Roberts Space Industries' },
      { name: 'Burst', size: 1, class: 'Civilian', grade: 'B', manufacturer: 'ArcCorp' },
      { name: 'Colossus', size: 1, class: 'Industrial', grade: 'B', manufacturer: 'Juno Starwerk' },
      { name: 'Drift', size: 1, class: 'Stealth', grade: 'C', manufacturer: 'RAMP Corporation' },
      { name: 'Eos', size: 1, class: 'Civilian', grade: 'C', manufacturer: 'Roberts Space Industries' },
      { name: 'Expedition', size: 1, class: 'Civilian', grade: 'C', manufacturer: 'Tarsus' },
      { name: 'Flood', size: 1, class: 'Civilian', grade: 'D', manufacturer: 'ArcCorp' },
      { name: 'FoxFire', size: 1, class: 'Competition', grade: 'B', manufacturer: 'Ace Astrogation' },
      { name: 'Goliath', size: 1, class: 'Industrial', grade: 'C', manufacturer: 'Juno Starwerk' },
      { name: 'LightFire', size: 1, class: 'Competition', grade: 'C', manufacturer: 'Ace Astrogation' },
      { name: 'Rush', size: 1, class: 'Civilian', grade: 'C', manufacturer: 'ArcCorp' },
      { name: 'Siren', size: 1, class: 'Military', grade: 'B', manufacturer: 'Wei-Tek' },
      { name: 'Spectre', size: 1, class: 'Stealth', grade: 'A', manufacturer: 'RAMP Corporation' },
      { name: 'VK-00', size: 1, class: 'Military', grade: 'A', manufacturer: 'Wei-Tek' },
      { name: 'Voyage', size: 1, class: 'Civilian', grade: 'B', manufacturer: 'Tarsus' },
      { name: 'Vulcan', size: 1, class: 'Industrial', grade: 'D', manufacturer: 'Juno Starwerk' },
      { name: 'Wayfare', size: 1, class: 'Civilian', grade: 'D', manufacturer: 'Tarsus' },
      { name: 'Zephyr', size: 1, class: 'Stealth', grade: 'B', manufacturer: 'RAMP Corporation' }
    ],
    2: [
      { name: 'Aither', size: 2, class: 'Civilian', grade: 'B', manufacturer: 'Roberts Space Industries' },
      { name: 'Bolon', size: 2, class: 'Industrial', grade: 'C', manufacturer: 'Juno Starwerk' },
      { name: 'Bolt', size: 2, class: 'Stealth', grade: 'B', manufacturer: 'RAMP Corporation' },
      { name: 'Cascade', size: 2, class: 'Civilian', grade: 'D', manufacturer: 'ArcCorp' },
      { name: 'Crossfield', size: 2, class: 'Military', grade: 'C', manufacturer: 'Wei-Tek' },
      { name: 'Flash', size: 2, class: 'Civilian', grade: 'B', manufacturer: 'ArcCorp' },
      { name: 'Hemera', size: 2, class: 'Civilian', grade: 'A', manufacturer: 'Roberts Space Industries' },
      { name: 'Huracan', size: 2, class: 'Industrial', grade: 'B', manufacturer: 'Juno Starwerk' },
      { name: 'Khaos', size: 2, class: 'Civilian', grade: 'C', manufacturer: 'Roberts Space Industries' },
      { name: 'Nova (quantum drive)', size: 2, class: 'Stealth', grade: 'C', manufacturer: 'RAMP Corporation' },
      { name: 'Odyssey (quantum drive)', size: 2, class: 'Civilian', grade: 'C', manufacturer: 'Tarsus' },
      { name: 'Quest', size: 2, class: 'Civilian', grade: 'D', manufacturer: 'Tarsus' },
      { name: 'Sojourn', size: 2, class: 'Civilian', grade: 'B', manufacturer: 'Tarsus' },
      { name: 'SparkFire', size: 2, class: 'Competition', grade: 'C', manufacturer: 'Ace Astrogation' },
      { name: 'Spicule', size: 2, class: 'Stealth', grade: 'A', manufacturer: 'RAMP Corporation' },
      { name: 'SunFire', size: 2, class: 'Competition', grade: 'B', manufacturer: 'Ace Astrogation' },
      { name: 'Torrent (quantum drive)', size: 2, class: 'Civilian', grade: 'C', manufacturer: 'ArcCorp' },
      { name: 'XL-1', size: 2, class: 'Military', grade: 'A', manufacturer: 'Wei-Tek' },
      { name: 'Yaluk', size: 2, class: 'Industrial', grade: 'D', manufacturer: 'Juno Starwerk' },
      { name: 'Yeager', size: 2, class: 'Military', grade: 'B', manufacturer: 'Wei-Tek' }
    ],
    3: [
      { name: 'Agni', size: 3, class: 'Industrial', grade: 'B', manufacturer: 'Juno Starwerk' },
      { name: 'Balandin', size: 3, class: 'Military', grade: 'B', manufacturer: 'Wei-Tek' },
      { name: 'Drifter', size: 3, class: 'Civilian', grade: 'D', manufacturer: 'Tarsus' },
      { name: 'Erebos', size: 3, class: 'Civilian', grade: 'A', manufacturer: 'Roberts Space Industries' },
      { name: 'Fissure', size: 3, class: 'Civilian', grade: 'C', manufacturer: 'ArcCorp' },
      { name: 'Impulse', size: 3, class: 'Civilian', grade: 'B', manufacturer: 'ArcCorp' },
      { name: 'Kama', size: 3, class: 'Industrial', grade: 'C', manufacturer: 'Juno Starwerk' },
      { name: 'Metis', size: 3, class: 'Civilian', grade: 'C', manufacturer: 'Roberts Space Industries' },
      { name: 'Pontes', size: 3, class: 'Military', grade: 'C', manufacturer: 'Wei-Tek' },
      { name: 'Ranger', size: 3, class: 'Civilian', grade: 'B', manufacturer: 'Tarsus' },
      { name: 'TS-2', size: 3, class: 'Military', grade: 'A', manufacturer: 'Wei-Tek' },
      { name: 'Tyche', size: 3, class: 'Civilian', grade: 'B', manufacturer: 'Roberts Space Industries' },
      { name: 'Vesta', size: 3, class: 'Industrial', grade: 'D', manufacturer: 'Juno Starwerk' },
      { name: 'Wanderer', size: 3, class: 'Civilian', grade: 'C', manufacturer: 'Tarsus' }
    ],
    4: [
      { name: 'Allegro', size: 4, class: 'Civilian', grade: 'A', manufacturer: 'ArcCorp' },
      { name: 'Frontline', size: 4, class: null, grade: 'A', manufacturer: 'Wei-Tek' },
      { name: 'Mauler Quantum Drive', size: 4, class: null, grade: 'A', manufacturer: 'Vanduul Clans' }
    ]
  }
};

// Helper: Get custom components for a type/size, with optional API merge
function getCustomComponents(type, size) {
  if (!CUSTOM_COMPONENTS[type] || !CUSTOM_COMPONENTS[type][size]) {
    return [];
  }
  return CUSTOM_COMPONENTS[type][size];
}

// Helper: Merge custom components with API components (custom takes priority)
function mergeComponentData(type, size, apiComponents) {
  const customComps = getCustomComponents(type, size);
  const customNames = new Set(customComps.map(c => c.name.toLowerCase()));

  // Add uuid to custom components (use name as unique identifier)
  const merged = customComps.map(c => ({
    ...c,
    uuid: c.uuid || `custom-${c.name.toLowerCase().replace(/\s+/g, '-')}`
  }));

  // Add any API components not in custom data
  apiComponents.forEach(apiComp => {
    if (!customNames.has(apiComp.name.toLowerCase())) {
      merged.push({
        name: apiComp.name,
        size: apiComp.size,
        class: apiComp.class || null,
        grade: apiComp.grade,
        manufacturer: apiComp.manufacturer || 'Unknown',
        uuid: apiComp.uuid
      });
    }
  });

  return merged;
}

// Helper: Sort components by priority order (Military→Stealth→Industrial→Competition→Civilian, then by grade A-D)
function sortComponentsByPriority(components) {
  const classPriority = {
    'Military': 0,
    'Stealth': 1,
    'Industrial': 2,
    'Competition': 3,
    'Civilian': 4
  };

  const gradePriority = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3
  };

  return components.sort((a, b) => {
    // Get class priority (default to 5 for null/unknown classes)
    const classA = classPriority[a.class] !== undefined ? classPriority[a.class] : 5;
    const classB = classPriority[b.class] !== undefined ? classPriority[b.class] : 5;

    // If classes differ, sort by class priority
    if (classA !== classB) {
      return classA - classB;
    }

    // If classes are the same, sort by grade priority
    const gradeA = gradePriority[a.grade] !== undefined ? gradePriority[a.grade] : 4;
    const gradeB = gradePriority[b.grade] !== undefined ? gradePriority[b.grade] : 4;

    if (gradeA !== gradeB) {
      return gradeA - gradeB;
    }

    // If class and grade are the same, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });
}
