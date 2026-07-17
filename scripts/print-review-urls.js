#!/usr/bin/env node
/* eslint-disable no-console */

const target = process.env.VITE_DEPLOY_TARGET ?? "local";
const teamUrl =
  process.env.ELEMENTS_TEAM_URL ?? "https://demo-elements-team.vercel.app";
const clientUrl =
  process.env.ELEMENTS_CLIENT_URL ?? "https://demo-elements-client.vercel.app";

console.log("");
console.log("  Elements - tryb review");
console.log("  ─────────────────────");
console.log(`  Target:   ${target}`);
console.log("  Lokalnie: http://127.0.0.1:8875/?review=1");
console.log(
  "  Dev:      http://127.0.0.1:5173/biblioteka/naglowek-i-stopka?review=1",
);
console.log(`  Zespół:   ${teamUrl}`);
console.log(`  Klient:   ${clientUrl}`);
console.log(
  "  Issues:   https://github.com/bronisMateusz/Demo-Elements/issues?q=label%3Aui-review",
);
console.log("  Deploy:   docs/DEPLOY.md");
console.log("");
