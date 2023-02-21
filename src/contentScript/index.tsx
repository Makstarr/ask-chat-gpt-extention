import { createRoot } from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import { theme } from 'src/theme/styled-components.theme';

import ContentScript from './contentScript';

function init() {
  const appContainer = document.createElement('div');
  appContainer.id = 'react-boilerplate-root';
  document.body.appendChild(appContainer);

  const root = createRoot(appContainer);
  root.render(
    <ThemeProvider theme={theme}>
      <ContentScript />
    </ThemeProvider>
  );
}

init();
