import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import UserList from './components/UserList'; // ייבוא הקומפוננטה

function App() {
  return (
    <div className="App">
      <Container className="mt-4">
        <UserList /> {/* הצגת רשימת המשתמשים */}
      </Container>
    </div>
  );
}

export default App;
