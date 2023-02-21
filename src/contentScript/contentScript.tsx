import { useEffect, useState } from 'react';

import { AskChatGPTButton } from 'src/contentScript/components/ask-chatgpt-button';
import { AskChatGPTModal } from 'src/contentScript/components/ask-chatgpt-modal';

export default () => {
  const [selectedText, setSelectedText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      if ((event.target as Element).id !== 'ask-chatgpt-button') {
        const text = window?.getSelection()?.toString() ?? '';
        setSelectedText(text);
      }
    };
    const handleContextMenuClick = (text: string) => {
      setSelectedText(text);
      setIsModalVisible(true);
    };

    window.addEventListener('mouseup', handleMouseUp);
    chrome.runtime.onMessage.addListener(handleContextMenuClick);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      chrome.runtime.onMessage.removeListener(handleContextMenuClick);
    };
  }, []);

  return (
    <>
      {selectedText && (
        <AskChatGPTButton
          id={'ask-chatgpt-button'}
          onClick={() => {
            setIsModalVisible(true);
          }}
        />
      )}
      {isModalVisible && (
        <AskChatGPTModal
          selectedText={selectedText}
          onClose={() => {
            setIsModalVisible(false);
          }}
        />
      )}
    </>
  );
};
