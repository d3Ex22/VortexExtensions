# VortexExtensions

Monorepo for Vortex game extensions.

## Extensions

| Folder | Game | Nexus domain |
|---|---|---|
| [`game-echoesofaincrad/`](./game-echoesofaincrad) | Echoes of Aincrad | `echoesofaincrad` |

## Releases

Each extension is versioned and released independently.

- Tag format: `<folder>-v<semver>` (e.g. `game-echoesofaincrad-v1.1.1`)
- Each GitHub Release attaches that extension’s zip only

## Build an extension

```powershell
cd game-echoesofaincrad
npm install
npm run build
```
