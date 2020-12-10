import { spawn as npmRunSpawn, spawnSync as npmRunSpawnSync } from "npm-run"; // eslint-disable-line no-restricted-imports

export const spawnDefaultOptions = {
  shell: true,
  stdio: "inherit",
};

export const spawn = (cmd, params = [], options = spawnDefaultOptions) =>
  npmRunSpawn(cmd, params, options);

export const spawnSync = (cmd, params = [], options = spawnDefaultOptions) =>
  npmRunSpawnSync(cmd, params, options);
