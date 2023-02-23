import React, { memo, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import rehypeHighlight from 'rehype-highlight';
import styled from 'styled-components';

import { Answer } from 'src/helpers/types';

import { Icon } from './icon';
import { Loader } from './loader';

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
      setError('');
      if (msg.text) {
        setAnswer(msg);
      } else if (msg.status) {
        setError(msg.status);
      }
    };

    port.onMessage.addListener(listener);
    port.postMessage({ type: REQUEST_MESSAGE_TYPE, question: props.question });

    return () => {
      port.onMessage.removeListener(listener);
      port.disconnect();
    };
  }, [props.question]);

  return (
    <StyledAnswer>
      <StyledIcon>
        <Icon />
      </StyledIcon>

      {props.question && error ? (
        <p>
          Failed to load response from ChatGPT:
          <span className="break-all block">{error}</span>
        </p>
      ) : null}

      {props.question && !answer && !error ? <Loader /> : null}

      {answer ? (
        <ReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]}>
          {answer.text}
        </ReactMarkdown>
      ) : null}
    </StyledAnswer>
  );
}

const StyledIcon = styled.div`
  position: absolute;
  top: -31px;
  left: -30px;
  width: 20px;
`;

const StyledAnswer = styled.div`
  background-color: ${({theme}) => theme.colors.inputsBackground};
  color: ${({theme}) => theme.colors.text};
  margin-left: 35px;
  margin-top: 35px;
  padding: 10px;
  position: relative;
  border-radius: 10px;

  ::before {
    content: '';
    height: 0;
    border-style: solid;
    border-width: 0 10px 30px 10px;
    border-color: transparent transparent ${({theme}) =>
            theme.colors.inputsBackground} transparent;
    transform: rotate(-45deg);
    position: absolute;
    top: -15px;
    left: -10px;
    width: 20px;
  }
}

::before {

}
`;

export default memo(ChatGptQuery);
