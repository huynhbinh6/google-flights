// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@assets': './src/assets',
            '@utils': './src/utils',
            '@routes': './src/routes',
            '@utils': './src/utils',
            '@helpers': './src/helpers',
            '@services': './src/services',
            '@middleware': './src/middleware'
          },
        },
        'react-native-reanimated/plugin',
      ],
    ],
  };
};
