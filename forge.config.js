const path = require('path');
const { version } = require('./package.json');

const iconDir = path.resolve(__dirname, 'assets', 'icons');

const commonLinuxConfig = {
  icon: {
    scalable: path.resolve(iconDir, 'icon.svg'),
  },
};

const config = {
  packagerConfig: {
    name: 'ezy',
    executableName: 'ezy',
    asar: true,
    icon: path.resolve(__dirname, 'assets', 'icons', 'icon'),
    appBundleId: 'com.getezy.ezy',
    appCategoryType: 'public.app-category.developer-tools',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: (arch) => ({
        name: 'ezy',
        exe: 'ezy.exe',
        noMsi: true,
        iconUrl: 'https://raw.githubusercontent.com/getezy/ezy/master/assets/icons/icon.ico',
        setupIcon: path.resolve(iconDir, 'icon.ico'),
        setupExe: `ezy-${version}-win32-${arch}-setup.exe`,
      }),
    },
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: commonLinuxConfig,
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
      config: commonLinuxConfig,
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/splash-screen/index.html',
              js: './src/splash-screen/renderer.tsx',
              name: 'splash_screen',
              preload: {
                js: './src/main/splash-preload.ts',
              },
            },
            {
              html: './src/app/index.html',
              js: './src/app/renderer.tsx',
              name: 'main_window',
              preload: {
                js: './src/main/app-preload.ts',
              },
            },
          ],
        },
      },
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'getezy',
          name: 'ezy',
        },
        draft: true,
        prerelease: false,
      },
    },
  ],
};

function macOsSignAndNotarize() {
  if (process.platform !== 'darwin') {
    return;
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
    // eslint-disable-next-line no-console
    console.warn(
      'Should be signed and notarized, but environment variables APPLE_ID or APPLE_ID_PASSWORD are missing!'
    );
    return;
  }

  config.packagerConfig.osxSign = {
    identity: 'Developer ID Application: Alexey Vasyukov (956U3Y3QV9)',
    optionsForFile: () => ({
      hardenedRuntime: true,
      entitlements: 'assets/entitlements.plist',
      signatureFlags: 'library',
    }),
  };

  config.packagerConfig.osxNotarize = {
    appBundleId: 'com.getezy.ezy',
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
    ascProvider: '956U3Y3QV9',
  };
}

macOsSignAndNotarize();

module.exports = config;
