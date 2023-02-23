const examples = [
  'Write a poem using selected text',
  'What is this?',
  'Summarize information',
  'Translate into german',
  'Correct grammar',
  'What is the main idea of this paragraph?',
  'Can you summarize this paragraph in one sentence?',
  'What is the purpose of this paragraph?',
];

export const getRandomQuestionExample = () => {
  return examples[Math.round(Math.random() * (examples.length - 1))];
};
