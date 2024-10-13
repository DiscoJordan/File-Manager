import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import os from "node:os";
import { cwd } from "node:process";
import path from "node:path";

const homeDir = os.homedir();

export const hashHandler = (pathToFile) => {
    try {
        let fileStream = createReadStream(
            pathToFile.startsWith(homeDir) ? pathToFile : path.join(cwd(), pathToFile)
          );
          let hash = createHash("sha256");
          hash.setEncoding("hex");
        
          fileStream.on("end", function () {
            hash.end();
            console.log("Hash successfully calculated: " + hash.read());
          });
        
          fileStream.pipe(hash);
    } catch (error) {
        console.error(`Error:  ${err.message}`);
    }
  
};
