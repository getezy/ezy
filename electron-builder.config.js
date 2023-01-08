process.env.OS = process.env.OS || process.platform;
process.env.DISABLE_SIGN_AND_NOTARIZE =
  process.env.DISABLE_SIGN_AND_NOTARIZE !== undefined
    ? process.env.DISABLE_SIGN_AND_NOTARIZE
    : 'true';

function isMacOsSignAndNotarizeDisabled() {
  return process.env.DISABLE_SIGN_AND_NOTARIZE === 'true';
}

const macOsSign = {
  identity: '956U3Y3QV9',
  hardenedRuntime: true,
  gatekeeperAssess: false,
};

/**
 * @type {import("electron-builder").Configuration}
 */
const config = {
  appId: 'com.getezy.ezy',
  productName: 'ezy',
  directories: {
    buildResources: 'resources',
    output: 'release',
  },
  files: ['resources', 'out'],
  asarUnpack: '**/*.{node,dll}',
  afterSign: isMacOsSignAndNotarizeDisabled() ? undefined : 'resources/notarize.js',
  win: {
    icon: 'resources/icons/icon.ico',
    executableName: 'ezy',
    target: ['nsis'],
  },
  mac: {
    type: 'distribution',
    icon: 'resources/icons/icon.icns',
    category: 'public.app-category.developer-tools',
    entitlementsInherit: 'resources/entitlements.mac.plist',
    target: ['dmg'],
    ...(isMacOsSignAndNotarizeDisabled()
      ? {
          identity: null,
        }
      : macOsSign),
  },
  linux: {
    maintainer: 'www.getezy.dev',
    target: ['AppImage', 'deb', 'rpm'],
  },
  // eslint-disable-next-line no-template-curly-in-string
  artifactName: '${name}-${version}-${env.OS}-${arch}.${ext}',
  npmRebuild: false,
};

module.exports = config;
