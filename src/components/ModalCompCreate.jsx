import React, { useState } from 'react';
import { Button, ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';

function ModalCompCreate({ isOpen, toggle, onCreate }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSave = () => {
    onCreate(title, body);
    setTitle('');
    setBody('');
    toggle();
  };

  const handleCancel = () => {
    setTitle('');
    setBody('');
    toggle();
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Create Post
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Post</ModalHeader>
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

export default ModalCompCreate;
