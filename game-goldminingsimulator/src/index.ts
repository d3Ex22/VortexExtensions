import path from "path";
import { fs, types, util } from "vortex-api";
import {
  BEPINEX_VERSION,
  EXECUTABLE,
  GAME_ID,
  GAME_LOGO,
  STEAMAPP_ID,
} from "./common";
import {
  installBepInExPrefixedMod,
  testBepInExPrefixedMod,
} from "./bepinexPrefix";

async function prepareForModding(discovery: types.IDiscoveryResult) {
  const root = discovery.path;
  await Promise.all(
    [
      path.join(root, "BepInEx", "plugins"),
      path.join(root, "BepInEx", "patchers"),
      path.join(root, "BepInEx", "config"),
    ].map((dir) => fs.ensureDirWritableAsync(dir)),
  );
}

function findGame() {
  return util.GameStoreHelper.findByAppId([STEAMAPP_ID]).then(
    (game) => game.gamePath,
  );
}

function main(context: types.IExtensionContext) {
  context.requireExtension("modtype-bepinex");

  context.registerGame({
    id: GAME_ID,
    name: "Gold Mining Simulator",
    mergeMods: true,
    queryPath: findGame,
    queryModPath: () => ".",
    logo: GAME_LOGO,
    executable: () => EXECUTABLE,
    requiredFiles: [EXECUTABLE],
    setup: prepareForModding,
    environment: {
      SteamAPPId: STEAMAPP_ID,
    },
    details: {
      steamAppId: parseInt(STEAMAPP_ID, 10),
      supportsSymlinks: false,
    },
  });

  // Priority 9: before modtype-bepinex (10). Archives with BepInEx/plugins|patchers|config.
  context.registerInstaller(
    "gms-bepinex-prefixed",
    9,
    testBepInExPrefixedMod as any,
    ((files: string[]) => installBepInExPrefixedMod(files)) as any,
  );

  context.once(() => {
    if (context.api.ext.bepinexAddGame !== undefined) {
      context.api.ext.bepinexAddGame({
        gameId: GAME_ID,
        autoDownloadBepInEx: true,
        architecture: "x64",
        unityBuild: "unitymono",
        forceGithubDownload: true,
        bepinexVersion: BEPINEX_VERSION,
      });
    }
  });

  return true;
}

export default main;
