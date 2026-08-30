import { defineConfig } from "eslint/config";
import nextConfig from "eslint-config-next";

// Next 16: eslint-config-next ya exporta flat configs (sin FlatCompat)
const eslintConfig = defineConfig([
  ...nextConfig,
]);

export default eslintConfig;
