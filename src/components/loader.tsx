import styled, { keyframes } from 'styled-components';

interface TProps {
  text?: string;
}

export const Loader = ({
  text = 'Waiting for ChatGPT response...',
}: TProps) => <AnimatedParagraph>{text}</AnimatedParagraph>;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Apply the pulse animation to the paragraph
const AnimatedParagraph = styled.p`
  animation: ${pulse} 1s ease-in-out infinite;
`;
