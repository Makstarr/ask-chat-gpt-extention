import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { getUserConfig, Theme } from 'src/shared/config';
import { detectSystemColorScheme } from 'src/shared/utils';
import GlobalStyle from 'src/theme/global-styles';
import { styledTheme } from 'src/theme/styled-components.theme';

import { Settings } from '../shared/settings';

async function init() {
  const appContainer = document.createElement('div');
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error('Can not find AppContainer');
  }
  document.body.id = 'ask-chatgpt-popup-container';
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
