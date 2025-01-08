import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { validateUserForm } from '../utils/validation'; // ייבוא הוולידציה

function EditUserModal({ show, handleClose, user, handleSave, allUsers }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(''); // הודעת שגיאה

  // עדכון ה-state בכל פעם שמשתמש חדש נשלח ל-Modal
  useEffect(() => {
    if (user) {
      setName(`${user.name.title} ${user.name.first} ${user.name.last}`);
      setEmail(user.email);
      setLocation(`${user.location.city}, ${user.location.country}`);
      setError(''); // איפוס הודעות השגיאה
    }
  }, [user]);

  const handleSaveChanges = () => {
    const errorMessage = validateUserForm(name, email, location, allUsers, user);
    if (errorMessage) {
      setError(errorMessage);
      console.log("Validation error:", errorMessage); // בדיקת השגיאה בקונסול
      return;
    }
    const updatedUser = {
      ...user,
      name: {
        ...user.name,
        title: name.split(' ')[0] || '',
        first: name.split(' ')[1] || '',
        last: name.split(' ')[2] || '',
      },
      email,
      location: {
        ...user.location,
        city: location.split(',')[0]?.trim() || '',
        country: location.split(',')[1]?.trim() || '',
      },
    };
    handleSave(updatedUser);
    handleClose(); // סגור את ה-Modal לאחר השמירה
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLocation" className="mt-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
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
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
