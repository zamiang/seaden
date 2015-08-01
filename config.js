module.exports = {
  APPLICATION_NAME: "seaden-staging",
  NODE_ENV: "development",
  SESSION_SECRET: "change-me",
  SESSION_COOKIE_MAX_AGE: "31536000000",
  SESSION_COOKIE_KEY: 'babel.sess',
  S3_KEY: null,
  S3_SECRET: null,
  DEFAULT_CACHE_TIME: 3600,
  PORT: "3005",
  ASSET_PATH: "/assets/",
  APP_URL: "localhost:3005",
  GOOGLE_ANALYTICS_ID: null
};

for (let key of Object.keys(module.exports)) {
  let val = (process.env[key] || module.exports[key]);
  try {
    module.exports[key] = JSON.parse(val);
  } catch (e) {
    module.exports[key] = val;
  }
}
