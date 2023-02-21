import Browser from 'webextension-polyfill';

import { styledTheme } from '../theme/styled-components.theme';

export function detectSystemColorScheme() {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return styledTheme.dark;
  }
  return styledTheme.light;
}

export function getExtensionVersion() {
  return Browser.runtime.getManifest().version;
}
