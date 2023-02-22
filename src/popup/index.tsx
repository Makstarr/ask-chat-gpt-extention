import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { getUserTheme } from 'src/shared/getUserTheme';
import { UserSettings } from 'src/shared/userSettings';
import GlobalStyle from 'src/theme/global-styles';

(async () => {
  const appContainer = document.createElement('div');
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error('Can not find AppContainer');
  }
  document.body.id = 'ask-chatgpt-popup-container';

  const root = createRoot(appContainer);
  const theme = await getUserTheme();

  // TODO: Add login logic here

  root.render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UserSettings />
    </ThemeProvider>
  );
})();
