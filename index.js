import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { inputHandler } from "./handlers/rootHandler.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let username = undefined;

const currentLocation = () => {
  console.log(`You are currently in ${__dirname} \n`);
};

process.argv.forEach((arg) => {
  if (arg.startsWith("--username")) {
    username = arg.slice(11);
  }
});

rl.on("line", (input) => {
  if (input === ".exit") {
    console.log(`Thank you for using File Manager, ${username}, goodbye! \n`);
    rl.pause();
  } else {
    inputHandler(input);
    currentLocation();
  }
});

console.log(`Welcome to the File Manager, ${username}! \n`);
currentLocation();

rl.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye! \n`);
  rl.pause();
});
