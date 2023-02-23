import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { UserSettings } from 'src/domains/options/user-settings';
import { getUserTheme } from 'src/helpers/getUserTheme';
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
      <UserSettings />
    </ThemeProvider>
  );
})();
