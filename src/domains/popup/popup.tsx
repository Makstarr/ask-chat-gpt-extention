import { useState } from 'react';

import { LoginChatGpt } from '../../components/login-chat-gpt';

export const Popup = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const onAuthStatusChange = (isAuthorized: boolean) => {
    setIsAuthorized(isAuthorized);
  };

  if (isAuthorized) {
    return <p>Successfully authorized, you can use the app </p>;
  }

  return <LoginChatGpt onStatusChange={onAuthStatusChange} />;
};
