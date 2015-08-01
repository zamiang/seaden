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

// Iterate over object using a generator expression
function entries(obj) {
  return (for (key of Object.keys(obj)) [key, obj[key]]);
}

for (let [key, value] of entries(module.exports)) {
  let val = (process.env[key] || val);
  try {
    module.exports[key] = JSON.parse(val);
  } catch (e) {
    module.exports[key] = val;
  }
}

// Warn if this file is included client-side
if (window) {
  alert("WARNING: Do not require config.coffee, please require('sharify').data instead.");
}
