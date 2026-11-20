require("dotenv").config({ path: ".env.production" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/master",
  DATABASE_URL,
  PORT,
  JWT_SECRET,
  FRONT_DOMAIN_NAME,
  REPO_PATH,
} = process.env;

module.exports = {
  apps: [
    {
      name: "app",
      script: "./dist/app.js",

      env_production: {
        NODE_ENV: "production",
        DATABASE_URL,
        PORT,
        JWT_SECRET,
        FRONT_DOMAIN_NAME,
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: REPO_PATH,
      path: DEPLOY_PATH,

      "pre-deploy-local":
        "scp ./.env.production ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/shared/.env",

      "post-deploy":
        "ln -sfn ../shared/.env .env.production && export PATH=$HOME/.nvm/versions/node/v22.23.5/bin:$PATH && npm install && npm run build && pm2 startOrReload ecosystem.config.js --env production",
    },
  },
};
