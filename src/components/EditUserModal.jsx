import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditUserModal({ show, handleClose, user }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={`${user.name.title} ${user.name.first} ${user.name.last}`}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" defaultValue={user.email} />
          </Form.Group>
          <Form.Group controlId="formLocation" className="mt-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              defaultValue={`${user.location.city}, ${user.location.country}`}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
