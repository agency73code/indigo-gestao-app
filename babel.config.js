module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // @tamagui/babel-plugin removido: causava "Unexpected token 'typeof'"
    // ao parsear tamagui.config.ts como JS no Windows.
    // Tamagui funciona 100% em runtime sem o extractor.
  };
};
