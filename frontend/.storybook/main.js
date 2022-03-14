const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",

  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "..", "src", "components"),
      "@modules": path.resolve(__dirname, "..", "src", "components"),
      "@context": path.resolve(__dirname, "..", "src", "context"),
      "@helpers": path.resolve(__dirname, "..", "src", "helpers"),
      "@services": path.resolve(__dirname, "..", "src", "services"),
      "@styles": path.resolve(__dirname, "..", "src", "styles"),
      "@utils": path.resolve(__dirname, "..", "src", "utils"),
      "@api": path.resolve(__dirname, "..", "src", "api"),
      "@hooks": path.resolve(__dirname, "..", "src", "hooks"),
      "@pages": path.resolve(__dirname, "..", "src", "pages"),
      "@redux": path.resolve(__dirname, "..", "src", "redux"),
      "@dev": path.resolve(__dirname, "..", "src", "dev"),
    };
    return config;
  },
};
