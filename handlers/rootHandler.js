import { osHandler } from './osHandler.js';
import { navigationHandler } from './navigationHandler.js';
import { basicOperationHandler } from './basicOperationsHandler.js';


export const inputHandler = (input) => {
  const [operation,...args] = input.trim().split(' ')

  switch (operation) {
    case "up":
    case "cd":
    case "ls":
        navigationHandler(operation,args[0])
      break;
    case "cat":
    case "add":
    case "rn":
    case "cp":
    case "mv":
    case "rm":
        basicOperationHandler(operation, args)
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
