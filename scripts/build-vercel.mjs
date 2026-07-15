import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: false });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const agentationEnabled = process.env.VITE_AGENTATION_ENABLED === "true";

run("npm", ["run", "build"]);

if (agentationEnabled) {
  run("npm", ["run", "build:agentation"]);
}

run("npm", ["run", "build:runtime-assets"]);
