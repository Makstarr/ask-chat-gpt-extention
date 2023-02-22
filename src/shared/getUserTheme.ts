import { styledTheme } from 'src/theme/styled-components.theme';
import { getUserConfig, Theme } from './userConfig';
import { detectSystemColorScheme } from './utils';

export const getUserTheme = async () => {
  const userConfig = await getUserConfig();

  if (!userConfig.theme) {
    return detectSystemColorScheme();
  } else {
    return styledTheme[userConfig.theme as Theme] || styledTheme.light;
  }
};
