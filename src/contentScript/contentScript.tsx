import { useEffect, useState } from 'react';

import { Button } from 'src/contentScript/components/button';
import { Modal } from 'src/contentScript/components/modal';

export default () => {
  const [selectedText, setSelectedText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      if ((event.target as Element).id !== 'my-button') {
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
        <Button
          id={'my-button'}
          onClick={() => {
            setIsModalVisible(true);
          }}
        />
      )}
      {isModalVisible && (
        <Modal
          selectedText={selectedText}
          onClose={() => {
            setIsModalVisible(false);
          }}
        />
      )}
    </>
  );
};
