import { cp, rm } from "shelljs";
import { spawn, getPort, createGulpTask } from "./scripts/lib";

exports.dev = createGulpTask({ description: "Run dev server" }, async (end) => {
  // get an open port
  process.env.PORT = await getPort(process.env.PORT);

  spawn("node server.js");

  end();
});

exports.httpServe = createGulpTask(
  { description: "Serves the content created from `out`, for static sites" },
  async (end) => {
    // get an open port
    process.env.SERVE_PORT = await getPort(process.env.SERVE_PORT);

    // starts a server for a static site
    spawn(`NODE_ENV=production http-serve ./out -p ${process.env.SERVE_PORT}`);

    end();
  }
);

exports.start = createGulpTask(
  { description: "Serves the content created from `build`, for SSR sites" },
  async (end) => {
    // get an open port
    process.env.SERVE_PORT = await getPort(process.env.SERVE_PORT);

    // starts a server for a static site
    spawn(`NODE_ENV=production next start ${process.env.SERVE_PORT}`); // use `node server.js` to start the SSR server

    end();
  }
);

exports.build = createGulpTask(
  { description: "Builds the site for both SSR and static site serving" },
  (end) => {
    // delete previous build directories
    rm("-rf", ".next", "out");

    spawn("NODE_ENV=production next build && next export");

    end();
  }
);

// this script must be idempotent, see `postinstall-postinstall` for more info
exports.postInstall = createGulpTask(
  {
    description: "Auto-runs after `yarn install`s and `remove`s",
  },
  (end) => {
    // Create default .env if it doesn't exist
    cp("-n", ".env.example", ".env");

    end();
  }
);

// Keep this at the end of the exports
exports.default = createGulpTask(async (end) => {
  console.log(`\n\nHi! Here are some commands you can run:\n`);

  const exportKeys = Object.keys(exports);
  const longestKeyLength = exportKeys.reduce(
    (acc, key) => Math.max(key.length, acc),
    0
  );

  Object.keys(exports).forEach((key) => {
    if (["default", "help"].includes(key)) return; // skip default export

    const exp = exports[key];

    const paddedKey = exp.description
      ? (key + " ".repeat(longestKeyLength)).slice(0, longestKeyLength)
      : key;

    console.log(
      `yarn ${paddedKey}${exp.description ? ` ==> ${exp.description}` : ""}`
    );
  });

  console.log("\n");

  end();
});

exports.help = (...params) => exports.default(...params);
