export enum DatabaseChannel {
  FIND = 'database:find',
  FIND_ONE = 'database:find-one',
  FIND_ONE_OR_FAIL = 'database:find-one-or-fail',
  UPSERT = 'database:upsert',
  UPSERT_MANY = 'database:upsert-many',
  DELETE = 'database:delete',
}
