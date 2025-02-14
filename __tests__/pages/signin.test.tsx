import SignIn from '@/app/signin/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/react';


jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('SignIn Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders sign in form', () => {
    render(<SignIn />);
    expect(screen.getByText('Sign in to read Stears')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('validates email format', async () => {
    render(<SignIn />);
    
    const emailInput = screen.getByPlaceholderText('Email address');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByText('Sign in');
    fireEvent.click(submitButton);
    await waitFor(() => {
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      });
    });
  
    it('handles successful sign in', async () => {
      (signIn as jest.Mock).mockResolvedValueOnce({ error: null });
      
      render(<SignIn />);
      
      fireEvent.change(screen.getByPlaceholderText('Email address'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('Password'), {
        target: { value: 'Password123!' },
      });
      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith('credentials', {
          redirect: false,
          email: 'test@example.com',
          password: 'Password123!',
        });
      });
    });
  });
  