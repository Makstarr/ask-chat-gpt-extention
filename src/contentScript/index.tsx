import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'src/theme/global-styles';
import { theme } from 'src/theme/styled-components.theme';

import ContentScript from './contentScript';

function init() {
  const appContainer = document.createElement('div');
  appContainer.id = 'ask-chatgpt-container';
  document.body.appendChild(appContainer);

  const root = createRoot(appContainer);
  root.render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ContentScript />
    </ThemeProvider>
  );
}

init();
