const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { getDefaultConfig } = require("expo/metro-config");
const { FileStore } = require("metro-cache");
const { withNativeWind } = require("nativewind/metro");
const path = require("node:path");

// Initialize Sentry config
const sentryConfig = getSentryExpoConfig(__dirname,{ isCSSEnabled: true });

// Combine Sentry config with default Expo config
const baseConfig = {
  ...getDefaultConfig(__dirname),
  ...sentryConfig,
};

const config = withTurborepoManagedCache(
  withMonorepoPaths(
    withNativeWind(baseConfig,{
      input: "./src/global.css", // Update this path if needed
      configPath: "./tailwind.config.ts",
    }),
  ),
);

// Resolve our exports in workspace packages
// if we're using zustand this will fail the build because of import.meta not being allowed , there are other libraries in use causing the error
//reference: https://discord.com/channels/695411232856997968/1271261219403071569
config.resolver.unstable_enablePackageExports = false

// Force resolving nested modules to the folders below (from Sentry config)
config.resolver.disableHierarchicalLookup = true;

module.exports = config;

/**
 * Add the monorepo paths to the Metro config.
 * This allows Metro to resolve modules from the monorepo.
 *
 * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withMonorepoPaths(config) {
  const projectRoot = __dirname;
  const workspaceRoot = path.resolve(projectRoot,"../..");

  // #1 - Watch all files in the monorepo
  config.watchFolders = [workspaceRoot];

  // #2 - Resolve modules within the project's `node_modules` first, then all monorepo modules
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot,"node_modules"),
    path.resolve(workspaceRoot,"node_modules"),
  ];

  return config;
}

/**
 * Move the Metro cache to the `.cache/metro` folder.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turbo.build/repo/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withTurborepoManagedCache(config) {
  // Use turborepo to restore the cache when possible
  config.cacheStores = [
    new FileStore({ root: path.join(__dirname,".cache","metro") }),
  ];
  return config;
}
