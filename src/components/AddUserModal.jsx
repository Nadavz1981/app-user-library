import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { validateUserForm } from '../utils/validation';

function AddUserModal({ show, handleClose, handleAdd, allUsers }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [picture, setPicture] = useState('https://via.placeholder.com/150'); // תמונת ברירת מחדל
  const [error, setError] = useState('');

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // יצירת URL זמני לתמונה
      setPicture(imageUrl);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setLocation('');
    setPicture('https://via.placeholder.com/150'); // החזרת תמונת ברירת המחדל
    setError(''); // איפוס הודעת השגיאה
  };

  const handleSave = () => {
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
        country: location.split(',')[1]?.trim() || '',
      },
      picture: {
        large: picture, // התמונה שהועלתה
      },
    };

    // בדיקת תקינות
    const validationError = validateUserForm(name, email, location, allUsers, newUser);
    if (validationError) {
      setError(validationError); // הצגת הודעת השגיאה
      return;
    }

    // הוספת משתמש חדש
    handleAdd(newUser);
    resetForm(); // איפוס הטופס
    handleClose(); // סגירת ה-Modal
  };

  const handleCloseModal = () => {
    resetForm(); // איפוס כל השדות בטופס
    handleClose(); // סגירת ה-Modal
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
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
          <Form.Group controlId="formPicture" className="mt-3">
            <Form.Label>Picture</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handlePictureUpload} />
          </Form.Group>
          {picture && (
            <div className="mt-3 text-center">
              <img
                src={picture}
                alt="Preview"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
          )}
        </Form>
        {error && <div className="text-danger mb-3">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
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
