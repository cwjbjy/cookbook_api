import { readFileSync } from 'fs';
import { join } from 'path';

import * as yaml from 'js-yaml';

const env = process.env.NODE_ENV || 'development';

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, '../../', `src/config/${env}.yml`), 'utf8'),
  ) as Record<string, any>;
};
