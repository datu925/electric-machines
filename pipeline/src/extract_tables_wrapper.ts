import { program } from "commander";

import { spawnSync } from "child_process";

program.option(
  "-f, --folders <folders...>",
  "Name of folder(s) under incentives_data/ where text data is located.",
  [] // default is no filter
);

program.parse();

async function callPython(folders: string[]): Promise<void> {
  for (const folder of folders) {
    spawnSync("python", ["./extract_tables.py", folder], {
      cwd: process.cwd(),
      stdio: "inherit",
    });
  }
}

async function main() {
  const opts = program.opts();
  await callPython(opts.folders);
}

main();
