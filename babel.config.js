module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            crypto: "crypto-browserify",
            stream: "stream-browserify",
            buffer: "buffer",
          },
        },
      ],
    ],
  };
};
