import styled from 'styled-components';

const StyledIcon = styled.img`
  margin: 0;
  width: 20px;
  height: 20px;
`;

export const Icon = () => (
  <StyledIcon src={chrome.runtime.getURL('icon.png')} />
);
