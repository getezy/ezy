module.exports = {
  reject: [
    // Bug with preload script in v20.0.0
    // https://github.com/electron/electron/issues/35195
    "electron"
  ]
};
