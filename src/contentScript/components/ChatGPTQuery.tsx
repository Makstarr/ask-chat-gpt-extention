// TODO: Refactor the whole file


// import { GearIcon } from '@primer/octicons-react'
// import { useEffect, useState } from 'preact/hooks'
import { memo, useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import rehypeHighlight from 'rehype-highlight';
import Browser from 'webextension-polyfill';

import { Answer } from 'src/shared/types';

export type QueryStatus = 'success' | 'error' | undefined;

interface Props {
  question?: string;
  onStatusChange: (status: QueryStatus) => void;
}

function ChatGPTQuery(props: Props) {
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  const [status, setStatus] = useState<QueryStatus>();

  useEffect(() => {
    const port = chrome.runtime.connect();
    console.log({ port });
    const listener = (msg: any) => {
      console.log({ msg });
      if (msg.text) {
        setAnswer(msg);
        setStatus('success');
        props.onStatusChange('success');
      } else if (msg.error) {
        setError(msg.error);
        setStatus('error');
        props.onStatusChange('error');
      } else if (msg.type === 'AUTHORIZED') {
        setStatus('success');
        props.onStatusChange('success');
      }
    };
    port.onMessage.addListener(listener);

    port.postMessage({ question: props.question });

    return () => {
      port.onMessage.removeListener(listener);
      port.disconnect();
    };
  }, [props.question, retry]);

  // retry error on focus
  useEffect(() => {
    const onFocus = () => {
      if (error && (error == 'UNAUTHORIZED' || error === 'CLOUDFLARE')) {
        setError('');
        setRetry((r) => r + 1);
      }
    };
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [error]);

  if (answer) {
    return (
      <div className="markdown-body gpt-markdown" id="gpt-answer" dir="auto">
        <ReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]}>
          {answer.text}
        </ReactMarkdown>
      </div>
    );
  }

  if (error === 'UNAUTHORIZED' || error === 'CLOUDFLARE') {
    return (
      <p>
        Please login and pass Cloudflare check at{' '}
        <a href="https://chat.openai.com" target="_blank" rel="noreferrer">
          chat.openai.com
        </a>
        {retry > 0 &&
          (() => {
            return (
              <span className="italic block mt-2 text-xs">
                OpenAI requires passing a security check every once in a while.
                If this keeps happening, change AI provider to OpenAI API in the
                extension options.
              </span>
            );
          })()}
      </p>
    );
  }
  if (error) {
    return (
      <p>
        Failed to load response from ChatGPT:
        <span className="break-all block">{error}</span>
      </p>
    );
  }

  if (status !== 'success') {
    return (
      <p className="text-[#b6b8ba] animate-pulse">
        Waiting for ChatGPT response...
      </p>
    );
  }
  return null;
}

export default memo(ChatGPTQuery);
