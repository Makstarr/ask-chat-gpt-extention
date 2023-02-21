import { createRoot } from 'react-dom/client';

import ContentScript from './contentScript';

function init() {
  const appContainer = document.createElement('div');
  appContainer.id = 'react-boilerplate-root';
  document.body.appendChild(appContainer);

  const root = createRoot(appContainer);
  root.render(<ContentScript />);
}

init();
