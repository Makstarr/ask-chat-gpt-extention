import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { getUserConfig, Theme, updateUserConfig } from '../../helpers/userConfig';

export function UserSettings() {
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
      {Object.entries(Theme).map(([key, value]) => (
        <div key={key}>
          <input
            type="radio"
            name={key}
            value={value}
            checked={theme === value}
            onChange={(e) => {
              onThemeChange(e.target.value as Theme);
            }}
          />
          <label>{value}</label>
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
