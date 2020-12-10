import Net from "net";
import { question } from "./question";
import { spawnSync } from "./spawn";

const timeout = async (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const MAX_PORT = 65535;

// used from https://gist.github.com/timoxley/1689041#gistcomment-2026833
export const isPortAvailable = (port) =>
  new Promise((resolve, reject) => {
    const tester = Net.createServer()
      .once("error", (err) =>
        err.code == "EADDRINUSE" ? resolve(false) : reject(err)
      )
      .once("listening", () =>
        tester.once("close", () => resolve(true)).close()
      )
      .listen(port);
  });

export const getPort = async (startingPort) => {
  let port = parseInt(startingPort, 10);

  for (port; port <= MAX_PORT; port++) {
    if (await isPortAvailable(port)) {
      break;
    }

    // can't bind to port, let's ask user if they want to use the next one
    try {
      const answer = await question(
        `Port ${port} is unavailable. Would you like to use ${
          port + 1
        } instead? (Y/n/[k]ill) `
      );

      // if users says no, abort
      if (["n", "no"].includes(answer.toLowerCase())) throw new Error();

      if (["kill", "k"].includes(answer.toLowerCase())) {
        spawnSync(`npx kill-port ${port}`);

        // wait a bit, and retry by decrementing the port
        await timeout(1000);
        port -= 1;
      }
    } catch (e) {
      throw new Error("Port could not be bound to");
    }
  }

  if (port > MAX_PORT) throw new Error("Port out of range");

  return port;
};
