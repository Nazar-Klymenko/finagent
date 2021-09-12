module.exports = {
  apps: [
    {
      name: "application",
      cwd: "application-finagent/",
      script: "serve",
      watch: true,
      env: {
        PM2_SERVE_PATH: "build",
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: "true",
        PM2_SERVE_HOMEPAGE: "/index.html",
      },
    },
    {
      name: "admin",
      cwd: "admin-finagent/",
      script: "serve",
      watch: true,
      env: {
        PM2_SERVE_PATH: "build",
        PM2_SERVE_PORT: 3001,
        PM2_SERVE_SPA: "true",
        PM2_SERVE_HOMEPAGE: "/index.html",
      },
    },
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
