// TODO: Refactor the whole file
//
export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum Language {
  Auto = 'auto',
  English = 'english',
  Chinese = 'chinese',
  Spanish = 'spanish',
  French = 'french',
  Korean = 'korean',
  Japanese = 'japanese',
  German = 'german',
  Portuguese = 'portuguese',
}

const userConfigWithDefaultValue = {
  theme: '',
  language: Language.Auto,
};

export type UserConfig = typeof userConfigWithDefaultValue;

export async function getUserConfig(): Promise<UserConfig> {
  const result = (await chrome.storage.local.get(
    Object.keys(userConfigWithDefaultValue)
  )) as UserConfig;

  return result ?? userConfigWithDefaultValue;
}

export async function updateUserConfig(updates: Partial<UserConfig>) {
  console.debug('update configs', updates);
  return chrome.storage.local.set(updates);
}
