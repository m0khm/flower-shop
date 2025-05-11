import path from 'path';

export default {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'components');
    return config;
  },
};
