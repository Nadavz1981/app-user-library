import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner, Container, Button } from 'react-bootstrap';
import EditUserModal from './EditUserModal.jsx'; // ייבוא ה-Modal

function UserList() {
    const [users, setUsers] = useState([]); // רשימת המשתמשים
    const [loading, setLoading] = useState(true); // סטטוס טעינה
    const [selectedUser, setSelectedUser] = useState(null); // המשתמש שנערוך
    const [showModal, setShowModal] = useState(false); // סטטוס פתיחת ה-Modal

    // טעינת נתוני משתמשים
    useEffect(() => {
        axios
            .get('https://randomuser.me/api/?results=10')
            .then((response) => {
                setUsers(response.data.results); // שמירת נתונים
                setLoading(false); // סיום טעינה
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setLoading(false); // סיום טעינה גם במקרה של שגיאה
            });
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleSaveChanges = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.login.uuid === updatedUser.login.uuid ? updatedUser : user
            )
        );
        setShowModal(false); // סגירת ה-Modal
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
            <Row>
                {users.map((user) => (
                    <Col md={4} lg={3} sm={6} xs={12} key={user.login.uuid} className="mb-4">
                        <Card className="shadow-lg border-0 h-100">
                            <Card.Img
                                variant="top"
                                src={user.picture.large}
                                alt={`${user.name.first} ${user.name.last}`}
                                style={{ borderRadius: '10px 10px 0 0', maxHeight: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body className="d-flex flex-column justify-content-between text-center">
                                <Card.Title className="mb-3">
                                    {user.name.title} {user.name.first} {user.name.last}
                                </Card.Title>
                                <Card.Text className="text-muted mb-3">
                                    <strong>Email:</strong> {user.email} <br />
                                    <strong>Location:</strong> {user.location.city}, {user.location.country}
                                </Card.Text>
                                <div className="mt-auto">
                                    <Button variant="primary" className="me-2" onClick={() => handleEdit(user)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(user)}>
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

            {/* ה-Modal */}
            {selectedUser && (
                <EditUserModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    user={selectedUser}
                    handleSave={handleSaveChanges}
                    allUsers={users}
                />

            )}
        </Container>
    );
}

export default UserList;
