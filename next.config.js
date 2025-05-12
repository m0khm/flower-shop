// next.config.js
const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack: (cfg) => {
    cfg.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return cfg;
  },
};

