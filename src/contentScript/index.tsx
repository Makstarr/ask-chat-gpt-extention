import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { getUserTheme } from 'src/shared/getUserTheme';
import GlobalStyle from 'src/theme/global-styles';

import ContentScript from './contentScript';

(async () => {
  const appContainer = document.createElement('div');
  appContainer.id = 'ask-chatgpt-container';
  document.body.appendChild(appContainer);

  const root = createRoot(appContainer);
  const theme = await getUserTheme();
  root.render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ContentScript />
    </ThemeProvider>
  );
})();
