import { app } from 'electron';
import path from 'path';

export const DATABSE_PATH = path.join(app.getPath('userData'), 'ezy.db');
