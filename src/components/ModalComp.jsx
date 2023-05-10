import React, { useState, useEffect } from 'react';
import { Button, ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';

function ModalComp({ isOpen, toggle, postId, initialTitle, initialBody, onSave, onCancel }) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
  }, [initialTitle, initialBody]);

  const handleSave = () => {
    onSave(postId, title, body);
    toggle();
  };

  const handleCancel = () => {
    onCancel();
    toggle();
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Edit
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Post</ModalHeader>
        <ModalBody>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalComp;
