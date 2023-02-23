// TODO: Refactor the whole file
import { styledTheme } from 'src/theme/styled-components.theme';

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
  return chrome.runtime.getManifest().version;
}
