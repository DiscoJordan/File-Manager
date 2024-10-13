import os from "node:os";

export const osHandler = (arg) => {
  switch (arg) {
    case "--EOL":
      console.log(`EOL: ${JSON.stringify(os.EOL)}`);
      break;

    case "--cpus":
      const userMachineCpuData = os.cpus();
      const cpusCoresNumber = userMachineCpuData.length;
      const cpusData = userMachineCpuData.map((cpu) => ({
        model: cpu.model,
        speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
      }));

      console.log(`Overall amount of CPUS : `, cpusCoresNumber, "\n");
      console.log(`Model and clock rate (in GHz): \n`, cpusData);

      break;

    case "--homedir":
      const userHomeDirectory = os.homedir();
      console.log(`Home directory is: ${userHomeDirectory}`);
      break;

    case "--username":
      try {
        const currentUserInfo = os.userInfo();
        const { username } = currentUserInfo;
        console.log(`Username: ${username}`);
      } catch (err) {
        throw new Error(err)
      }
      break;
    case "--architecture":
        console.log(`Your CPU architecture: ${os.arch()}`)
      break;

    default:
      break;
  }
};
