import Readline from "readline";

// used from https://stackoverflow.com/a/53981240/506913
export const question = (q) => {
  let response;

  const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt(q);
  rl.prompt();

  return new Promise((resolve, reject) => {
    rl.on("line", (userInput) => {
      response = userInput;
      rl.close();
    });

    rl.on("close", () => {
      resolve(response);
    });
  });
};
