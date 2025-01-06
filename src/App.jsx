import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import UserList from './components/UserList'; // ייבוא הקומפוננטה

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">User Library App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <UserList /> {/* הצגת רשימת המשתמשים */}
      </Container>
    </div>
  );
}

export default App;
