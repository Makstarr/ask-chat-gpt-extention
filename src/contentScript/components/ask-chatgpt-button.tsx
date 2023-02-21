import React from 'react';

import styled from 'styled-components';

export const AskChatGPTButton = ({
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton {...rest}>
      <Icon src={chrome.runtime.getURL('icon.png')} />
      Ask ChatGPT
    </StyledButton>
  );
};

const StyledButton = styled.button`
  transition: all 0.3s;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  line-height: 14px;
  font-weight: bold;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 100%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: fixed;
  bottom: 48px;
  right: 24px;
  z-index: 999;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  row-gap: 8px;

  :hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
