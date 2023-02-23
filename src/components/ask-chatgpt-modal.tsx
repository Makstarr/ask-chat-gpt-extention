import React, { useEffect, useState } from 'react';

import styled, { css } from 'styled-components';

import { getRandomQuestionExample } from '../helpers/get-random-question-example';
import ChatGPTQuery from './chat-gpt-query';
import { Icon } from './icon';
import { LoginChatGpt } from './login-chat-gpt';

interface TProps {
  onClose: () => void;
  selectedText: string;
}

export const AskChatGPTModal = ({ onClose, selectedText }: TProps) => {
  const [editedSelectedText, setEditedSelectedText] = useState(selectedText);
  const [question, setQuestion] = useState('');
  const [questionError, setQuestionError] = useState('');
  const [requestString, setRequestString] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [exampleQuestion, setExampleQuestion] = useState(
    getRandomQuestionExample()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(getRandomQuestionExample());
      setExampleQuestion(getRandomQuestionExample());
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authorized) {
      return;
    }
    setQuestionError('');
    if (!question) {
      setQuestionError('Please provide a question');
      return;
    }
    setRequestString(editedSelectedText + ' ' + question);
  }

  const onAuthStatusChange = (isAuthotized: boolean) => {
    setAuthorized(isAuthotized);
  };

  return (
    <StyledModalContainer onMouseDown={onClose}>
      <StyledModal onMouseDown={(event) => event.stopPropagation()}>
        <StyledHeader>
          What do you want to know? <Icon />
        </StyledHeader>
        <form onSubmit={handleSubmit}>
          <StyledLabel>
            Question
            <StyledInput
              type="text"
              placeholder={`Example: ${exampleQuestion}`}
              value={question}
              error={!!questionError}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
            {questionError && <ErrorMessage>{questionError}</ErrorMessage>}
          </StyledLabel>
          <StyledLabel>
            Selected text
            <StyledTextArea
              value={editedSelectedText}
              onChange={(e) => {
                setEditedSelectedText(e.target.value);
              }}
            />
          </StyledLabel>
          {authorized && <StyledButton type="submit">Ask ChatGPT</StyledButton>}
        </form>
        {!authorized && (
          <StyledAuth>
            <LoginChatGpt onStatusChange={onAuthStatusChange} />
          </StyledAuth>
        )}
        {requestString && <ChatGPTQuery question={requestString} />}
      </StyledModal>
    </StyledModalContainer>
  );
};

const StyledAuth = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.inputsBackground};
  color: ${({ theme }) => theme.colors.pink};
  margin-top: 20px;
  padding: 10px;
  border-radius: 3px;

  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: underline;
  }
`;

const StyledModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
`;

export const StyledModal = styled.div`
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  max-height: 80%;
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 10px;
  padding-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  padding-bottom: 20px;
  font-weight: normal;
  font-size: 16px;
  row-gap: 10px;
  border-radius: 3px;
`;

const ErrorMessage = styled.label`
  color: red;
`;

const inputStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  padding: 10px;
  font-weight: normal;
  font-size: 16px;
  row-gap: 10px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.inputsBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

const StyledInput = styled.input<{ error: boolean }>`
  ${inputStyles}

  ${({ error }) =>
    error &&
    css`
      border-color: red;
    `}
`;

const StyledTextArea = styled.textarea`
  ${inputStyles};
  height: 100px;
  resize: vertical;
`;

const StyledButton = styled.button`
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.textContrast};
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.text};
  }
`;
