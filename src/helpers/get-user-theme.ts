// TODO: Change name
import { styledTheme } from 'src/theme/styled-components.theme';

import { getUserConfig, Theme } from './user-config';
import { detectSystemColorScheme } from './utils';

export const getUserTheme = async () => {
  const userConfig = await getUserConfig();

  if (!userConfig.theme) {
    return detectSystemColorScheme();
  } else {
    // @ts-ignore
    return styledTheme[userConfig.theme] ?? styledTheme.light;
  }
};
