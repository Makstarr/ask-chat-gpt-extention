const examples = [
  'Write a poem using selected text',
  'What is this?',
  'Summarize information',
  'Translate into german',
  'Correct grammar',
];

export const getRandomQuestionExample = () => {
  return examples[Math.round(Math.random() * (examples.length - 1))];
};
