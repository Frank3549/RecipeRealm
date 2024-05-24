/**
 * Cross-platform command line runner to catch SIGINT (ctrl-c) and exit cleanly.
 *
 * This script created with help from GitHub copilot, using the prompts
 * "Write a node script that execs remaining command line arguments while catching sigint"
 */
const { spawn } = require("child_process");

// Execute the command line arguments passed to this script
const args = process.argv.slice(2);
const child = spawn(args[0], args.slice(1));

process.on("SIGINT", () => {
  // Exit without an error, on SIGINT (ctrl-c)
  process.exit(0);
});

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
