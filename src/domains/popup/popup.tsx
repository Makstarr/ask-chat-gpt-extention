import { useState } from 'react';

import { LoginChatGpt } from '../../components/login-chat-gpt';

export const Popup = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const onAuthStatusChange = (isAuthorized: boolean) => {
    setIsAuthorized(isAuthorized);
  };

  const openOptionsPage = () => {
    chrome.runtime.sendMessage({ type: 'OPEN_OPTIONS_PAGE' });
  };

  return (
    <div>
      <button onClick={openOptionsPage}>Settings</button>
      {isAuthorized ? (
        <p>Successfully authorized, you can use the app </p>
      ) : (
        <LoginChatGpt onStatusChange={onAuthStatusChange} />
      )}
    </div>
  );
};
