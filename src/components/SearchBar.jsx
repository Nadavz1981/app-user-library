import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // מעדכן את החיפוש בקומפוננטת UserList
    };

    return (
        <Form className="mb-4">
            <Form.Control
                type="text"
                placeholder="Search by name, email, location, or UUID..."
                value={searchTerm}
                onChange={handleSearch}
            />
        </Form>
    );
}

export default SearchBar;
