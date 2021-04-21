const presets = ['module:metro-react-native-babel-preset'];
const plugins = ['babel-plugin-styled-components'];

plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.json'],
    alias: {
      '@': './src',
    },
  },
]);

module.exports = {
  presets,
  plugins,
};
