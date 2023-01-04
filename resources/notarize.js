/* eslint-disable import/no-extraneous-dependencies */

const { notarize } = require('@electron/notarize');

module.exports = async (context) => {
  if (process.env.DISABLE_SIGN_AND_NOTARIZE === 'true') {
    // eslint-disable-next-line no-console
    console.log(`Notarizing disabled.`);
    return;
  }

  if (!process.env.CI) {
    // eslint-disable-next-line no-console
    console.log(`Skipping notarizing, not in CI.`);
    return;
  }

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

  const { appOutDir } = context;

  const appName = context.packager.appInfo.productFilename;

  try {
    await notarize({
      appBundleId: 'com.getezy.ezy',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
      ascProvider: '956U3Y3QV9',
      appPath: `${appOutDir}/${appName}.app`,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
