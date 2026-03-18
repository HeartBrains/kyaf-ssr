module.exports = {
  apps: [
    {
      name: 'kyaf-ssr',
      script: '.output/server/index.mjs',
      interpreter: '/opt/alt/alt-nodejs24/root/usr/bin/node',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
