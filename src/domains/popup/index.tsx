import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { getUserTheme } from 'src/helpers/getUserTheme';
import GlobalStyle from 'src/theme/global-styles';

import { Popup } from './popup';

(async () => {
  const appContainer = document.createElement('div');
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error('Can not find AppContainer');
  }
  document.body.id = 'ask-chatgpt-popup-container';

  const root = createRoot(appContainer);
  const theme = await getUserTheme();

  root.render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Popup />
    </ThemeProvider>
  );
})();
