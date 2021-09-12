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
      name: "landing",
      cwd: "landing-finagent/",
      script: "yarn",
      watch: true,
      node_args: "port 3002",
    },
  ],
};
