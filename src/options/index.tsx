import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { getUserTheme } from 'src/shared/getUserTheme';
import { Settings } from 'src/shared/settings';
import GlobalStyle from 'src/theme/global-styles';

(async () => {
  const appContainer = document.createElement('div');
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error('Can not find AppContainer');
  }
  const root = createRoot(appContainer);
  const theme = await getUserTheme();
  root.render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Settings />
    </ThemeProvider>
  );
})();
