import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const MyModal = ({ open, disableGlobalScroll, children }) => {
  const [modalRoot] = useState(document.createElement('div'));

  useEffect(() => {
    const body = document.body;
    if (open) {
      body.appendChild(modalRoot);
      if (disableGlobalScroll) {
        body.style.overflow = 'hidden';
      }
    } else {
      body.removeChild(modalRoot);
      body.style.overflow = 'auto';
    }
    return () => {
      body.removeChild(modalRoot);
      body.style.overflow = 'auto';
    };
  }, [open, disableGlobalScroll, modalRoot]);

  return open
    ? ReactDOM.createPortal(
        <div>
          {children}
        </div>,
        modalRoot
      )
    : null;
};

function SomeComponent() {
  const [open, setOpen] = useState(false);

  return (
    <MyModal open={open} disableGlobalScroll={true}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <h1>Some content</h1>
        <button onClick={() => setOpen(false)}>close</button>
      </div>
    </MyModal>
  );
}