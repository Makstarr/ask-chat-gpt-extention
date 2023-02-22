import React, {useState} from 'react';

import styled, {css} from 'styled-components';

import ChatGPTQuery, {
//QueryStatus
} from './ChatGPTQuery';
import {getRandomQuestionExample} from './get-random-question-example';
import {Icon} from './icon';

interface TProps {
    onClose: () => void;
    selectedText: string;
}

export const AskChatGPTModal = ({onClose, selectedText}: TProps) => {
    const [editedSelectedText, setEditedSelectedText] = useState(selectedText);
    const [question, setQuestion] = useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <StyledModalContainer className="modal-background" onClick={onClose}>
            <StyledModal
                className="modal-content"
                onClick={(event) => event.stopPropagation()}
            >
                <StyledHeader>
                    What do you want to know? <Icon/>
                </StyledHeader>
                <form onSubmit={handleSubmit}>
                    <StyledLabel>
                        Question
                        <StyledInput
                            type="text"
                            placeholder={`Example: ${getRandomQuestionExample()}`}
                            value={question}
                            onChange={(e) => {
                                setQuestion(e.target.value);
                            }}
                        />
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
                    <StyledButton type="submit">Ask ChatGPT</StyledButton>
                </form>
                <ChatGPTQuery question={question + ' ' + editedSelectedText}/>
            </StyledModal>
        </StyledModalContainer>
    );
};

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
  color: ${({theme}) => theme.colors.text};
  background-color: ${({theme}) => theme.colors.primary};
  border: 2px solid ${({theme}) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  max-height: 800px;
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
  background-color: ${({theme}) => theme.colors.inputsBackground};
  border: 1px solid ${({theme}) => theme.colors.border};
  color: ${({theme}) => theme.colors.text};
`;

const StyledInput = styled.input`
  ${inputStyles}
`;

const StyledTextArea = styled.textarea`
  ${inputStyles};
  min-height: 150px;
`;

const StyledButton = styled.button`
  transition: all 0.2s;
  background-color: ${({theme}) => theme.colors.accent};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: 3px;
  color: ${({theme}) => theme.colors.textContrast};
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.colors.primaryDark};
    color: ${({theme}) => theme.colors.text};
  }
`;
