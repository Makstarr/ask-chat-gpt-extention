import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'src/theme/global-styles';

import { getUserConfig, Theme } from '../shared/config';
import { styledTheme } from '../theme/styled-components.theme';
import { detectSystemColorScheme } from '../shared/utils';
import ContentScript from './contentScript';

async function init() {
  const appContainer = document.createElement('div');
  appContainer.id = 'ask-chatgpt-container';
  document.body.appendChild(appContainer);

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
      <ContentScript />
    </ThemeProvider>
  );
}

init();
