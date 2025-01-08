import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner, Container, Button } from 'react-bootstrap';
import EditUserModal from './EditUserModal.jsx';
import AddUserModal from './AddUserModal.jsx';

function UserList() {
    const [apiUsers, setApiUsers] = useState([]); // משתמשים מה-API בלבד
    const [addedUsers, setAddedUsers] = useState(() => {
        const savedAddedUsers = localStorage.getItem('addedUsers');
        return savedAddedUsers ? JSON.parse(savedAddedUsers) : [];
    });
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://randomuser.me/api/?results=10');
                setApiUsers(response.data.results);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        localStorage.setItem('addedUsers', JSON.stringify(addedUsers));
    }, [addedUsers]);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleSaveChanges = (updatedUser) => {
        setAddedUsers((prevAddedUsers) =>
            prevAddedUsers.map((user) =>
                user.login.uuid === updatedUser.login.uuid ? updatedUser : user
            )
        );
        setShowModal(false);
    };

    const handleDelete = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name.first} ${user.name.last}?`)) {
            // בדיקת מקור המשתמש (API או משתמש שהוסף ידנית)
            if (apiUsers.some((u) => u.login.uuid === user.login.uuid)) {
                setApiUsers((prevApiUsers) =>
                    prevApiUsers.filter((u) => u.login.uuid !== user.login.uuid)
                );
            } else {
                setAddedUsers((prevAddedUsers) =>
                    prevAddedUsers.filter((u) => u.login.uuid !== user.login.uuid)
                );
            }
        }
    };
    

    const handleAddUser = (newUser) => {
        setAddedUsers((prevAddedUsers) => [...prevAddedUsers, newUser]);
    };

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container className="mt-4">
            <header
                style={{
                    backgroundColor: '#343a40',
                    color: '#fff',
                    padding: '10px 0',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    marginBottom: '20px',
                    borderRadius: '10px',
                }}
            >
                User Library App
            </header>
            <Button
                variant="success"
                className="mb-4"
                style={{
                    backgroundColor: '#28a745',
                    borderColor: '#28a745',
                    fontSize: '1.2rem',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                }}
                onClick={() => setShowAddUserModal(true)}
            >
                Add User
            </Button>
            <Row>
                {[...apiUsers, ...addedUsers].map((user) => (
                    <Col md={4} lg={3} sm={6} xs={12} key={user.login.uuid} className="mb-4">
                        <Card
                            className="shadow-lg border-0 h-100"
                            style={{
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            <Card.Img
                                variant="top"
                                src={user.picture.large}
                                alt={`${user.name.first} ${user.name.last}`}
                                style={{
                                    borderRadius: '50%',
                                    maxWidth: '120px',
                                    maxHeight: '120px',
                                    objectFit: 'cover',
                                    margin: '15px auto',
                                }}
                            />
                            <Card.Body style={{ backgroundColor: '#f8f9fa', textAlign: 'center' }}>
                                <Card.Title className="mb-3">
                                    {user.name.title} {user.name.first} {user.name.last}
                                </Card.Title>
                                <Card.Text className="text-muted mb-3">
                                    <strong>Email:</strong> {user.email} <br />
                                    <strong>Location:</strong> {user.location.city}, {user.location.country}
                                </Card.Text>
                                <div className="mt-auto">
                                    <Button
                                        variant="primary"
                                        className="me-2"
                                        style={{ borderRadius: '20px' }}
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        style={{ borderRadius: '20px' }}
                                        onClick={() => handleDelete(user)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>

                            <Card.Footer className="text-center bg-light">
                                <small className="text-muted">UUID: {user.login.uuid}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <AddUserModal
                show={showAddUserModal}
                handleClose={() => setShowAddUserModal(false)}
                handleAdd={handleAddUser}
                allUsers={[...apiUsers, ...addedUsers]}
            />

            {selectedUser && (
                <EditUserModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    user={selectedUser}
                    handleSave={handleSaveChanges}
                    allUsers={[...apiUsers, ...addedUsers]}
                />
            )}
        </Container>
    );
}

export default UserList;
