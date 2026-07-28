# Vortex Extension — Gold Mining Simulator

- **Repo:** [d3Ex22/VortexExtensions](https://github.com/d3Ex22/VortexExtensions) (`game-goldminingsimulator/`)
- **Nexus domain:** `goldminingsimulator`
- **Steam App ID:** `451340`
- **BepInEx:** [5.4.23.5 win_x64](https://github.com/BepInEx/BepInEx/releases/download/v5.4.23.5/BepInEx_win_x64_5.4.23.5.zip) (Unity Mono)

Uses Vortex `modtype-bepinex`. Missing BepInEx is downloaded from GitHub on activate/deploy — enable **Bepis Injector Extensible** so it deploys.

Steam folder may be named `Gold Rush The Game`. Discovery uses App ID `451340`. Required file: `GoldMiningSimulator.exe`.

## Build

```powershell
cd game-goldminingsimulator
npm install
npm run build          # dist/ + out/goldminingsimulator-<version>.zip
npm run copyplugin     # %AppData%\Roaming\Vortex\plugins\goldminingsimulator-<version>
```

Restart Vortex after `copyplugin`.

## Art assets (`src/assets`)

| File | Size | Role |
| --- | --- | --- |
| `tile.jpg` | 600x900 (2:3) | `registerGame.logo` |
| `gameart.jpg` | 1280x720-ish | Banner / packaging |
| `thumbnail.jpg` | 80x80 (1:1) | From game `.exe` icon |

## Deploy paths

| Mod type | Path |
| --- | --- |
| Bepis Injector Extensible | Game root (`winhttp.dll`, `BepInEx/core`, …) |
| BepInEx (plugins) | `BepInEx/plugins/` |
| BepInEx (patchers) | `BepInEx/patchers/` |
| BepInEx (root) | `BepInEx/` |

## Archive conventions

| Layout | Type |
| --- | --- |
| Loose `.dll` or `<Mod>/…` (+ optional `Assets/`) | plugins |
| `plugins/` / `patchers/` / `config/` at archive root | root |
| `BepInEx/plugins|patchers|config/…` | root (GMS strips the `BepInEx/` prefix) |

Injector packs (`winhttp.dll`, `BepInEx/core`, …) stay with `modtype-bepinex`.
