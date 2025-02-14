export const validateEmail = (email: string): string | null => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/\d/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*]/.test(password)) return 'Password must contain at least one special character';
    return null;
  };
  
  export const validateName = (name: string): string | null => {
    if (!name) return 'Name is required';
    if (!/^[a-zA-Z\s-]{2,30}$/.test(name)) return 'Name can only contain letters, spaces, and hyphens';
    return null;
  };