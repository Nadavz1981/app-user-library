import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddUserModal({ show, handleClose, handleAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  const handleSave = () => {
    if (!name || !email || !location) {
      alert('All fields are required.');
      return;
    }

    const newUser = {
      login: { uuid: Date.now().toString() }, // מזהה ייחודי למשתמש החדש
      name: {
        title: 'Mr/Ms',
        first: name.split(' ')[0],
        last: name.split(' ')[1] || '',
      },
      email,
      location: {
        city: location.split(',')[0].trim(),
        country: location.split('')[1]?.trim() || '',
      },
      picture: {
        large: 'https://via.placeholder.com/150', // תמונה ברירת מחדל
      },
    };

    handleAdd(newUser);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLocation" className="mt-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="City, Country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSave}>
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUserModal;
