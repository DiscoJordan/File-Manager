import { osHandler } from './osHandler.js';
import { navigationHandler } from './navigationHandler.js';
import { basicOperationHandler } from './basicOperationsHandler.js';
 import {compressHandler} from './compressHandler.js'
import {decompressHandler} from './decompressHandler.js'
import {hashHandler} from './hashHandler.js'


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
        hashHandler(args[0])
      break;

    case "compress":
        compressHandler(args)
      break;
    case "decompress":
        decompressHandler(args)
      break;

    default:
      console.log("wrong command - try again");
      const helpList = [
        {Command:'up', Meaning:'Go upper from current directory (when you are in the root folder this operation shouldnt change working directory)'},
        {Command:'cd path_to_directory', Meaning:'Go to dedicated folder from current directory (path_to_directory can be relative or absolute)'},
        {Command:'ls', Meaning:'Print in console list of all files and folders in current directory.'},
        {Command:'cat path_to_file', Meaning:'Read file and print its content in console (should be done using Readable stream)'},
        {Command:'add new_file_name', Meaning:'Create empty file in current working directory'},
        {Command:'rn path_to_file new_filename', Meaning:'Rename file (content should remain unchanged)'},
        {Command:'cp path_to_file path_to_new_directory', Meaning:'Copy file (should be done using Readable and Writable streams)'},
        {Command:'mv path_to_file path_to_new_directory', Meaning:'Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams)'},
        {Command:'rm path_to_file', Meaning:'Delete file'},
        {Command:'os --EOL', Meaning:'Get EOL (default system End-Of-Line) and print it to console'},
        {Command:'os --cpus', Meaning:'Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console'},
        {Command:'os --homedir', Meaning:'Get home directory and print it to console'},
        {Command:'os --username', Meaning:'Get current system user name (Do not confuse with the username that is set when the application starts) and print it to console'},
        {Command:'os --architecture', Meaning:'Get CPU architecture for which Node.js binary has compiled and print it to console'},
        {Command:'hash path_to_file', Meaning:'Calculate hash for file and print it into console'},
        {Command:'compress path_to_file path_to_destination', Meaning:'Compress file (using Brotli algorithm, should be done using Streams API)'},
        {Command:'decompress path_to_file path_to_destination', Meaning:'Decompress file (using Brotli algorithm, should be done using Streams API)'},
      ]
      console.table(helpList)
      break;
  }
};
