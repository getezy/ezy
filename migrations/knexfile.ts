const path = require('path');

module.exports = {
  client: 'sqlite',
  connection: {
    filename: path.join(__dirname, '../ezy.db'),
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'js',
    tableName: 'migrations',
    directory: path.join(__dirname, './dist'),
  },
};
