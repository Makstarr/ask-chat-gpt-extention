import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { getUserConfig, Theme } from '../shared/config';
import { Settings } from '../shared/settings';
import { detectSystemColorScheme } from '../shared/utils';
import GlobalStyle from '../theme/global-styles';
import { styledTheme } from '../theme/styled-components.theme';


async function init() {
  const appContainer = document.createElement('div');
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error('Can not find AppContainer');
  }
  const root = createRoot(appContainer);

  const userConfig = await getUserConfig();
  let theme;
  if (!userConfig.theme) {
    theme = detectSystemColorScheme();
  } else {
    theme = styledTheme[userConfig.theme as Theme] || styledTheme.light;
  }

  root.render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Settings />
    </ThemeProvider>
  );
}

init();
