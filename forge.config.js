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
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: (arch) => ({
        name: 'ezy',
        exe: 'ezy.exe',
        noMsi: true,
        // iconUrl: 'https://raw.githubusercontent.com/getezy/ezy/ /assets/icons/ezy.ico',
        setupIcon: path.resolve(iconDir, 'icon.ico'),
        setupExe: `ezy-${version}-win32-${arch}-setup.exe`,
      }),
    },
    {
      name: '@electron-forge/maker-zip',
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
    [
      '@electron-forge/plugin-webpack',
      {
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/app/index.html',
              js: './src/app/renderer.tsx',
              name: 'main_window',
              preload: {
                js: './src/main/preload.ts',
              },
            },
          ],
        },
      },
    ],
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

module.exports = config;
