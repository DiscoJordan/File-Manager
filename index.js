import readline from "node:readline/promises";
import { inputHandler } from "./handlers/rootHandler.js";
import os from 'node:os';
import { cwd } from 'node:process'

const homeDir = os.homedir();
process.chdir(homeDir);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let username = undefined;
const currentLocation = () => {
  console.log(`You are currently in ${cwd()} \n`);
};

process.argv.forEach((arg) => {
  if (arg.startsWith("--username")) {
    username = arg.slice(11);
  }
});

rl.on("line", (input) => {
  if (input === ".exit") {
    console.log(`Thank you for using File Manager, ${username}, goodbye! \n`);
    rl.close();
  } else {
    inputHandler(input);
    currentLocation();
  }
});

console.log(`Welcome to the File Manager, ${username}! \n`);
currentLocation();

rl.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye! \n`);
  rl.close();
});
