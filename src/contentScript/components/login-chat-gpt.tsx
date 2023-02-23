import { useEffect, useState } from 'react';

export const AUTH_MESSAGE_TYPE = 'AUTH';
export const AUTH_MESSAGE_SUCCESS = 'AUTHORIZED';

export const LoginChatGpt = ({
  onStatusChange,
}: {
  onStatusChange: (isAutorized: boolean) => void;
}) => {
  const [retry, setRetry] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const onFocus = () => {
      if (status !== AUTH_MESSAGE_SUCCESS) {
        setIsLoading(true);
        setRetry((r) => r + 1);
      }
    };
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    const port = chrome.runtime.connect();
    const authListener = (msg: any) => {
      if (msg.type === AUTH_MESSAGE_TYPE) {
        setStatus(msg.status);
        onStatusChange(msg.success === true);
      }
      setIsLoading(false);
    };
    port.onMessage.addListener(authListener);
    console.log(port);
    port.postMessage({ type: AUTH_MESSAGE_TYPE });

    return () => {
      port.onMessage.removeListener(authListener);
      port.disconnect();
    };
  }, [retry]);

  if (isLoading) {
    return (
      <p className="text-[#b6b8ba] animate-pulse">
        Waiting for ChatGPT response...
      </p>
    );
  }

  if (status && status === 'CLOUDFLARE') {
    return (
      <p>
        Can't connect to{' '}
        <a href="https://chat.openai.com" target="_blank" rel="noreferrer">
          chat.openai.com
        </a>{' '}
        status: 403
        <br />
        <br />
        {retry > 0 &&
          (() => {
            return (
              <span>
                OpenAI requires passing a security check every once in a while.
                If you can't log in please try again later.
              </span>
            );
          })()}
      </p>
    );
  }

  if (status && status === 'UNAUTHORIZED') {
    return (
      <p>
        Please login at{' '}
        <a href="https://chat.openai.com" target="_blank" rel="noreferrer">
          chat.openai.com
        </a>
        <br />
        <br />
        {retry > 0 &&
          (() => {
            return (
              <span>
                OpenAI requires passing a security check every once in a while.
                If you can't log in please try again later.
              </span>
            );
          })()}
      </p>
    );
  }

  // if (status) {
  //   return (
  //     <p>
  //       Failed to load response from ChatGPT:
  //       <span className="break-all block">{status}</span>
  //     </p>
  //   );
  // }

  return null;
};
