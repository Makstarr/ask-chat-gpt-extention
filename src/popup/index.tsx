import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { getUserTheme } from 'src/shared/getUserTheme';
import { UserSettings } from 'src/options/user-settings';
import GlobalStyle from 'src/theme/global-styles';

import { LoginChatGpt } from '../contentScript/components/login-chat-gpt';
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
