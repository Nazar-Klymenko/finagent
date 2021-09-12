module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "backend-finagent/",
      script: "dist/index.js",
      exec_mode: "fork_mode",
      watch: true,
      node_args: "-r dotenv/config",
    },
  ],
};
