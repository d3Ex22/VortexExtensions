# VortexExtensions

Vortex game extensions.

| Folder | Game | Nexus domain | Loader |
| --- | --- | --- | --- |
| [`game-echoesofaincrad/`](./game-echoesofaincrad) | Echoes of Aincrad | `echoesofaincrad` | UE4SS |
| [`game-goldminingsimulator/`](./game-goldminingsimulator) | Gold Mining Simulator | `goldminingsimulator` | BepInEx |

## Releases

- **Tag:** `<folder>-v<semver>` (e.g. `game-goldminingsimulator-v1.0.0`) — kept for all versions
- **Title:** `<Game Name> v<semver>` (e.g. `Gold Mining Simulator v1.0.0`, `Echoes of Aincrad v1.1.1`)
- **Releases page:** only the current version per game stays as a GitHub Release; older versions are removed from Releases but remain on their tags

## Nexus description

Each extension folder has `nexus-description.txt` — BBCode source for the Nexus Mods page.

## Build

```powershell
cd game-goldminingsimulator
npm install
npm run build
```
