module.exports = function (api) {
  api.cache(true);
  return {
    // Expo configures Reanimated's Worklets plugin when the library is installed.
    presets: ['babel-preset-expo'],
  };
};
