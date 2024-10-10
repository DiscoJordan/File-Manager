import { osHandler } from './osHandler.js';


export const inputHandler = (input) => {
  const [operation,...args] = input.trim().split(' ')
  switch (operation) {
    case "up":
    case "cd":
    case "ls":
      console.log("Navigation & working directory (nwd)");
      break;
    case "cat":
    case "add":
    case "rn":
    case "cp":
    case "mv":
    case "rm":
      console.log("Basic operations with files");
      break;
    case "os":
        osHandler(args[0])
      break;

    case "hash":
      console.log("hash info");
      break;

    case "compress":
      console.log("compress info");
      break;
    case "decompress":
      console.log("decompress info");
      break;

    default:
      console.log("ne bool");
      break;
  }
};
