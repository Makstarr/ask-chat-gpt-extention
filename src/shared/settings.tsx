import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { getUserConfig, Theme, updateUserConfig } from './config';

export function Settings() {
  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    getUserConfig().then((config) => setTheme(config.theme));
  }, []);

  const onThemeChange = (theme: Theme) => {
    updateUserConfig({ theme });
    setTheme(theme);
  };

  return (
    <StyledSettings>
      <h1>Set theme</h1>
      <div>Reload the page to see changes</div>
      {Object.entries(Theme).map(([k, v]) => (
        <div key={k}>
          <input
            type="radio"
            name={k}
            value={v}
            checked={theme === v}
            onChange={(e) => {
              onThemeChange(e.target.value as Theme);
            }}
          />
          <label>{v}</label>
        </div>
      ))}
    </StyledSettings>
  );
}

const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
