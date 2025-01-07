

export const validateUserForm = (name, email, location, allUsers, currentUser) => {
    if (!name || !email || !location) {
      return 'All fields are required.';
    }
    if (name.length < 3) {
      return 'Name must be at least 3 characters long.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    const isEmailUnique = allUsers.every(
        (u) => u.login.uuid === currentUser.login.uuid || u.email !== email
      );
      
    if (!isEmailUnique) {
      return 'Email must be unique.';
    }
    return ''; // אם הכול תקין
  };
  