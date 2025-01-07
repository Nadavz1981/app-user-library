import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner, Container, Button } from 'react-bootstrap';

function UserList() {
  const [users, setUsers] = useState([]); // רשימת המשתמשים
  const [loading, setLoading] = useState(true); // סטטוס טעינה

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
            <Card className="shadow-lg border-0">
              <Card.Img
                variant="top"
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                style={{ borderRadius: '10px 10px 0 0', maxHeight: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="text-center">
                <Card.Title>
                  {user.name.title} {user.name.first} {user.name.last}
                </Card.Title>
                <Card.Text className="text-muted">
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Location:</strong> {user.location.city}, {user.location.country}
                </Card.Text>
                <Button variant="primary">Edit</Button>
              </Card.Body>
              <Card.Footer className="text-center bg-light">
                <small className="text-muted">UUID: {user.login.uuid}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default UserList;
