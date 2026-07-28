import path from "path";
import { types } from "vortex-api";
import { GAME_ID } from "./common";

const BIX = "bepinex";
const ROOT_DIRS = new Set(["plugins", "patchers", "config"]);

function segmentsOf(file: string): string[] {
  return file.split(/[/\\]/).filter((s) => s.length > 0);
}

function bepinexIndex(segments: string[]): number {
  return segments.findIndex((s) => s.toLowerCase() === BIX);
}

// Full injector pack → handled by modtype-bepinex.
export function isBepInExInjectorArchive(files: string[]): boolean {
  const basenames = new Set(
    files.map((f) => path.basename(f).toLowerCase()),
  );
  if (
    basenames.has("winhttp.dll") ||
    basenames.has("version.dll") ||
    basenames.has("doorstop_config.ini")
  ) {
    return true;
  }

  return files.some((file) => {
    const segs = segmentsOf(file).map((s) => s.toLowerCase());
    const idx = segs.indexOf(BIX);
    if (idx === -1) {
      return false;
    }
    return (
      segs[idx + 1] === "core" &&
      path.basename(file).toLowerCase() === "bepinex.dll"
    );
  });
}

// BepInEx/plugins|patchers|config/... (optional parent folder OK).
export function isBepInExPrefixedMod(files: string[]): boolean {
  if (isBepInExInjectorArchive(files)) {
    return false;
  }

  return files.some((file) => {
    if (file.endsWith(path.sep) || file.endsWith("/") || file.endsWith("\\")) {
      return false;
    }
    const segs = segmentsOf(file);
    const idx = bepinexIndex(segs);
    if (idx === -1 || idx + 1 >= segs.length) {
      return false;
    }
    return ROOT_DIRS.has(segs[idx + 1].toLowerCase());
  });
}

function destinationAfterBepInEx(file: string): string | null {
  const segs = segmentsOf(file);
  const idx = bepinexIndex(segs);
  if (idx === -1 || idx + 1 >= segs.length) {
    return null;
  }
  return segs.slice(idx + 1).join(path.sep);
}

export function testBepInExPrefixedMod(
  files: string[],
  gameId: string,
): Promise<types.ISupportedResult> {
  const supported = gameId === GAME_ID && isBepInExPrefixedMod(files);
  return Promise.resolve({ supported, requiredFiles: [] });
}

export function installBepInExPrefixedMod(
  files: string[],
): Promise<types.IInstallResult> {
  const instructions: types.IInstruction[] = files
    .filter(
      (file) =>
        !file.endsWith(path.sep) &&
        !file.endsWith("/") &&
        !file.endsWith("\\"),
    )
    .map((file) => {
      const destination = destinationAfterBepInEx(file);
      if (!destination) {
        return null;
      }
      return {
        type: "copy" as const,
        source: file,
        destination,
      };
    })
    .filter((instr): instr is types.IInstruction => instr !== null);

  instructions.push({
    type: "setmodtype",
    value: "bepinex-root",
  });

  return Promise.resolve({ instructions });
}
