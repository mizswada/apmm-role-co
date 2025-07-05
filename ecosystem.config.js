// For running pm2 | ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "AIDevX Prototype",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
