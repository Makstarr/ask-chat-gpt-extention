import React, { useState } from 'react';

import styled from 'styled-components';

interface TProps {
  onClose: () => void;
  selectedText: string;
}

export const Modal = ({ onClose, selectedText }: TProps) => {
  const [editedSelectedText, setEditedSelectedText] = useState(selectedText);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <CustomModalContainer className="modal-background" onClick={onClose}>
      <CustomModal
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <h2>Modal Window</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Selected text:
            <input
              type="text"
              value={editedSelectedText}
              onChange={(e) => {
                setEditedSelectedText(e.target.value);
              }}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </CustomModal>
    </CustomModalContainer>
  );
};

export default Modal;

const CustomModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const CustomModal = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 480px;
  width: 100%;
  text-align: center;
`;
