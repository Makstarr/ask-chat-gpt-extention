import { memo, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import rehypeHighlight from 'rehype-highlight';

import { Answer } from 'src/helpers/types';

export type QueryStatus = 'success' | 'error' | undefined;

interface Props {
  question?: string;
}

export const REQUEST_MESSAGE_TYPE = 'CHAT GPT REQUEST MESSAGE';

function ChatGptQuery(props: Props) {
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const port = chrome.runtime.connect();
    const listener = (msg: any) => {
      if (msg.type !== REQUEST_MESSAGE_TYPE) {
        return;
      }
      setError('');
      if (msg.text) {
        setAnswer(msg);
      } else if (msg.error) {
        setError(msg.error);
      }
    };

    port.onMessage.addListener(listener);
    port.postMessage({ type: REQUEST_MESSAGE_TYPE, question: props.question });

    return () => {
      port.onMessage.removeListener(listener);
      port.disconnect();
    };
  }, [props.question]);

  if (error) {
    return (
      <p>
        Failed to load response from ChatGPT:
        <span className="break-all block">{error}</span>
      </p>
    );
  }

  if (props.question && !answer) {
    return (
      <p className="text-[#b6b8ba] animate-pulse">
        Waiting for ChatGPT response...
      </p>
    );
  }

  if (answer) {
    return (
      <div>
        <ReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]}>
          {answer.text}
        </ReactMarkdown>
      </div>
    );
  }

  return null;
}

export default memo(ChatGptQuery);
